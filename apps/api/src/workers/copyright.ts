import PgBoss from 'pg-boss';
import { db } from '@cms/db';
import { getTenantDb, copyrightRegistry } from '@cms/db';

export async function setupCopyrightGuardian(boss: PgBoss) {
  await boss.start();

  await boss.work('scan-copyright', async (job) => {
    const { videoId, blogId } = job.data as { videoId: string; blogId: string };
    
    try {
      console.log(`[AI Copyright Guardian] Scanning video ${videoId} for tenant ${blogId}...`);
      
      const tenantDb = getTenantDb(blogId);
      
      // Simulated AI Pre-Flight Scan logic
      const probability = Math.random();
      let status = 'safe';
      let timestampStart = 0;
      let timestampEnd = 0;
      
      if (probability > 0.8) {
        status = 'risk';
        timestampStart = 10.5;
        timestampEnd = 15.0;
      } else if (probability > 0.95) {
        status = 'flagged';
        timestampStart = 5.0;
        timestampEnd = 24.5;
      }

      await tenantDb.insert(copyrightRegistry).values({
        videoId,
        timestampStart,
        timestampEnd,
        claimStatus: status
      });

      console.log(`[AI Copyright Guardian] Scan complete for ${videoId}: ${status}`);
    } catch (e) {
      console.error('[AI Copyright Guardian] Scan failed', e);
    }
  });
}
