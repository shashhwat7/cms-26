import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as publicSchema from './schema/public';
import * as tenantSchema from './schema/tenant';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema: { ...publicSchema, ...tenantSchema } });

export function getTenantDb(blogId: string) {
  return drizzle(pool, {
    schema: { ...publicSchema, ...tenantSchema },
    logger: true,
  }, async (client) => {
    // Drizzle doesn't natively support dynamic search_path per query out of the box in a simple way
    // without using middleware or custom wrapper. For this architecture, we prepend search_path.
    await client.query(`SET search_path TO "tenant_${blogId}", public`);
  });
}
