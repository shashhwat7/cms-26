import PgBoss from 'pg-boss';
import { getTenantDb } from '@cms/db';
import { socialAccounts, realtimeCache } from '@cms/db';

export async function setupRealtimeWorker(boss: PgBoss) {
  const JOB_NAME = 'refresh-realtime-metrics';

  // Run every 90 seconds (1.5 minutes) for active platforms
  await boss.schedule(JOB_NAME, '*/2 * * * *', {});

  boss.work(JOB_NAME, async (job) => {
    // In a multi-tenant setup, this worker might iterate through tenants
    // or operate globally if the job payload defines the tenant.
    // Assuming simple demo-tenant for this implementation.
    const db = getTenantDb('demo-tenant');

    try {
      const accounts = await db.select().from(socialAccounts);
      
      for (const account of accounts) {
        if (!account.isActive) continue;

        // Perform actual platform API calls here based on platform...
        // MOCK data generation for demonstration
        let freshMetrics: any = {};
        if (account.platform === 'instagram') {
           freshMetrics = { 
              followers: Math.floor(12000 + Math.random() * 500), 
              reachToday: Math.floor(2000 + Math.random() * 200),
              engagementRateToday: (4.0 + Math.random() * 0.5).toFixed(1)
           };
        } else if (account.platform === 'youtube') {
           freshMetrics = {
              subscribers: Math.floor(89000 + Math.random() * 100),
              viewsToday: Math.floor(4000 + Math.random() * 500),
              watchTimeHoursToday: Math.floor(15 + Math.random() * 5)
           };
        }

        await db.insert(realtimeCache).values({
           channelId: account.id,
           platform: account.platform,
           metrics: freshMetrics,
           fetchedAt: new Date()
        }).onConflictDoUpdate({
           target: realtimeCache.channelId,
           set: { metrics: freshMetrics, fetchedAt: new Date() }
        });
      }
    } catch (e) {
      console.error('Error refreshing realtime metrics:', e);
    }
  });
}
