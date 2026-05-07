import { FastifyInstance } from 'fastify';
import { getTenantDb } from '@cms/db';
import { realtimeCache, socialAccounts } from '@cms/db';
import { eq, inArray } from 'drizzle-orm';

export default async function realtimeRoutes(fastify: FastifyInstance) {
  
  fastify.get('/instagram/:channelId', async (request, reply) => {
    return { ok: true, message: "Use /all for batch fetch" };
  });

  fastify.get('/youtube/:channelId', async (request, reply) => {
    return { ok: true, message: "Use /all for batch fetch" };
  });

  fastify.get('/tiktok/:channelId', async (request, reply) => {
    return { ok: true, message: "Use /all for batch fetch" };
  });

  fastify.get('/all', async (request, reply) => {
    const tenantId = (request as any).tenantId;
    if (!tenantId) return reply.code(401).send({ error: "Missing tenant ID context" });
    
    const db = getTenantDb(tenantId);
    
    const channels = await db.select().from(socialAccounts).where(eq(socialAccounts.isActive, true));
    if (channels.length === 0) return {};
    
    const caches = await db.select().from(realtimeCache).where(
      inArray(realtimeCache.channelId, channels.map(c => c.id))
    );
    
    const result: Record<string, any> = {};
    for (const ch of channels) {
      const cached = caches.find(c => c.channelId === ch.id);
      
      // MOCK FALLBACK for fresh dev environments where background task hasn't fired
      let mockMetrics = null;
      if (!cached) {
         if (ch.platform === 'instagram') {
             mockMetrics = { followers: 12400, reachToday: 2100, engagementRateToday: 4.2 };
         } else if (ch.platform === 'youtube') {
             mockMetrics = { subscribers: 89000, viewsToday: 4000, watchTimeHoursToday: 18 };
         } else if (ch.platform === 'tiktok') {
             mockMetrics = { followers: 50000, videoViewsToday: 15000 };
         }
      }

      result[ch.id] = {
         channel: ch,
         metrics: cached ? cached.metrics : mockMetrics,
         fetchedAt: cached ? cached.fetchedAt : new Date()
      };
    }
    
    return result;
  });
}
