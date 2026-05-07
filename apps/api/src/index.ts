import Fastify from 'fastify';
import PgBoss from 'pg-boss';
import tenantPlugin from './plugins/tenant';
import mediaRoutes from './routes/media';
import socialRoutes from './routes/social';
import realtimeRoutes from './routes/realtime';
import { setupScheduler } from './workers/scheduler';
import { setupRealtimeWorker } from './workers/realtime';

const fastify = Fastify({ logger: true });

// Register Plugins
fastify.register(tenantPlugin);

// Register Routes
fastify.register(mediaRoutes, { prefix: '/media' });
fastify.register(socialRoutes, { prefix: '/social' });
fastify.register(realtimeRoutes, { prefix: '/realtime' });

const start = async () => {
  try {
    // Development Mock for PgBoss to prevent crash if Postgres isn't running locally
    const boss = new PgBoss(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/cms');
    
    boss.on('error', error => console.error(error));
    await boss.start();
    
    await setupScheduler(boss);
    await setupRealtimeWorker(boss);

    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:3001`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
