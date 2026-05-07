import { FastifyInstance } from 'fastify';
import { socialAccounts, engagementMetrics, videos } from '@cms/db';
import { getTenantDb } from '@cms/db';
import { eq, desc } from 'drizzle-orm';

export default async function socialRoutes(fastify: FastifyInstance) {
  
  // Get all connected social accounts
  fastify.get('/accounts', async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const db = getTenantDb(tenantId);
    
    const accounts = await db.select().from(socialAccounts).where(eq(socialAccounts.isActive, true));
    return accounts;
  });

  // Mock connecting a new account
  fastify.post('/accounts/connect', async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const db = getTenantDb(tenantId);
    const { platform, handle } = request.body as { platform: string; handle: string };

    const newAccount = await db.insert(socialAccounts).values({
      platform,
      handle,
      accessToken: 'mock_token_' + Math.random().toString(36).substring(7),
      isActive: true,
    }).returning();

    return newAccount[0];
  });

  // Get social analytics for a specific video
  fastify.get('/analytics/:videoId', async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const db = getTenantDb(tenantId);
    const { videoId } = request.params as { videoId: string };

    const metrics = await db.select().from(engagementMetrics).where(eq(engagementMetrics.videoId, videoId));
    
    // Fallback/Mock if no metrics exist
    if (metrics.length === 0) {
      return [
        { platform: 'instagram', views: 1240, likes: 88, comments: 12 },
        { platform: 'tiktok', views: 5200, likes: 442, comments: 56 },
        { platform: 'youtube', views: 310, likes: 15, comments: 4 }
      ];
    }

    return metrics;
  });

  // Get global performance overview
  fastify.get('/overview', async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const db = getTenantDb(tenantId);

    // Mock data for the dashboard
    return {
      totalViews: 45200,
      totalLikes: 8900,
      averageReachIndex: 1.42,
      topPerformingCircuit: 'Spiritual (Varanasi)',
      recentGrowth: '+12.5%'
    };
  });
}
