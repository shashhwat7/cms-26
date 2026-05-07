import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { db, tenantMemberships, getTenantDb } from '@cms/db';
import { eq, and } from 'drizzle-orm';
import type { TenantContext } from '@cms/types';

declare module 'fastify' {
  interface FastifyRequest {
    tenant: TenantContext;
    user: { id: string; email: string }; // Simplified user session
    tenantDb: ReturnType<typeof getTenantDb>;
  }
}

const tenantPlugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.decorateRequest('tenant', null);
  fastify.decorateRequest('user', null);
  fastify.decorateRequest('tenantDb', null);

  fastify.addHook('preHandler', async (request, reply) => {
    // 1. Read X-Tenant-ID header
    const tenantId = request.headers['x-tenant-id'] as string;
    
    // For scaffolding, we mock a user ID. In a real app, verify Lucia auth session.
    const userId = "00000000-0000-0000-0000-000000000000"; 
    request.user = { id: userId, email: 'test@example.com' };

    if (!tenantId) {
      return reply.status(400).send({ error: 'Missing X-Tenant-ID header' });
    }

    // 2. Verify membership
    const membership = await db.query.tenantMemberships.findFirst({
      where: and(
        eq(tenantMemberships.tenantId, tenantId),
        eq(tenantMemberships.userId, userId)
      ),
    });

    // Uncomment this in production to enforce membership check
    // if (!membership) {
    //   return reply.status(403).send({ error: 'Forbidden: No access to this tenant' });
    // }

    // 3. Attach tenant context
    request.tenant = {
      tenantId,
      schema: `tenant_${tenantId}`,
      role: membership?.role || 'owner',
    };

    // 4. Attach scoped db connection
    request.tenantDb = getTenantDb(tenantId);
  });
};

export default fp(tenantPlugin);
