import { FastifyPluginAsync } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// To be configured in env
const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });
const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'inkwell-cms-bucket';

const s3UploadPlugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.post('/upload/presigned-url', async (request, reply) => {
    // Rely on the tenant_path hook
    const tenantContext = request.tenant;
    
    if (!tenantContext) {
      return reply.status(403).send({ error: 'Tenant context missing.' });
    }

    const { filename, contentType } = request.body as { filename: string, contentType: string };
    
    if (!filename || !contentType) {
      return reply.status(400).send({ error: 'Missing filename or contentType.' });
    }

    // Virtualized S3 Path prefixing
    const objectKey = `tenant_${tenantContext.tenantId}/${uuidv4()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: objectKey,
      ContentType: contentType,
      Metadata: {
        'x-amz-meta-tenant-id': tenantContext.tenantId
      }
    });

    try {
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return { uploadUrl: signedUrl, objectKey, publicUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${objectKey}` };
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Failed to generate S3 pre-signed URL.' });
    }
  });
};

export default s3UploadPlugin;
