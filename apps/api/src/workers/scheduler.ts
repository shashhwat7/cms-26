import PgBoss from 'pg-boss';
import { db, tenants, videos } from '@cms/db';
import { getTenantDb } from '@cms/db';
import { eq, and, lte } from 'drizzle-orm';

export async function setupScheduler(boss: PgBoss) {
  boss.on('error', console.error);
  await boss.start();

  await boss.schedule('publish-scheduled-videos', '* * * * *'); // Every minute

  await boss.work('publish-scheduled-videos', async (job) => {
    try {
      // 1. Get all active tenants
      const allTenants = await db.select({ id: tenants.id }).from(tenants);

      // 2. Iterate each tenant and publish due videos
      for (const tenant of allTenants) {
        const tenantDb = getTenantDb(tenant.id);
        
        const videosToPublish = await tenantDb.select().from(videos).where(
          and(
            eq(videos.status, 'scheduled'),
            lte(videos.scheduledAt, new Date())
          )
        );

        for (const video of videosToPublish) {
          console.log(`[SocialVault] Publishing video "${video.title}" to [${(video.platforms as string[])?.join(', ') || 'none'}]`);
          
          // Implementation of platform-specific publishing would go here
          // e.g., await publishToInstagram(video);

          await tenantDb.update(videos)
            .set({ status: 'published', updatedAt: new Date() })
            .where(eq(videos.id, video.id));
        }

        if (videosToPublish.length > 0) {
          console.log(`[Redis/Webhook] Fired event for tenant ${tenant.id}: Published ${videosToPublish.length} videos.`);
          // TODO: boss.send('webhook-worker', { tenantId: tenant.id, videos: videosToPublish })
        }
      }
      
      console.log('Scheduler tick completed');
    } catch (e) {
      console.error('Job failed', e);
    }
  });
}
