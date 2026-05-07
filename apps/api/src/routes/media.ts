import { FastifyPluginAsync } from 'fastify';

const mediaRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/upload', async (request, reply) => {
    // Implement multipart upload to S3 here
    // Save record to tenant.media
    return { success: true, url: 'https://s3.example.com/file' };
  });
};

export default mediaRoutes;
