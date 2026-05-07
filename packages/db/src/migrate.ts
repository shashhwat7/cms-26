import { db } from './client';
import { sql } from 'drizzle-orm';
import { blogs } from './schema/public';

export async function provisionTenant(blogId: string) {
  const schemaName = `tenant_${blogId}`;
  
  await db.transaction(async (tx) => {
    // 1. Create schema
    await tx.execute(sql.raw(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`));
    
    // 2. Set search path for this transaction
    await tx.execute(sql.raw(`SET search_path TO "${schemaName}"`));

    // 3. Create tables (simplified DDL execution; in reality you'd run generated migrations against this schema)
    await tx.execute(sql.raw(`
      CREATE TABLE IF NOT EXISTS "${schemaName}".videos (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title text,
        video_url text,
        hook_strength real NOT NULL DEFAULT 0,
        trending_weight real NOT NULL DEFAULT 1.0,
        duration_penalty real NOT NULL DEFAULT 1.0,
        status text NOT NULL DEFAULT 'draft',
        scheduled_at timestamptz,
        author_id uuid,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS "${schemaName}".engagement_metrics (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        video_id uuid REFERENCES "${schemaName}".videos(id) NOT NULL,
        platform text NOT NULL,
        views integer NOT NULL DEFAULT 0,
        likes integer NOT NULL DEFAULT 0,
        comments integer NOT NULL DEFAULT 0,
        recorded_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS "${schemaName}".copyright_registry (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        video_id uuid REFERENCES "${schemaName}".videos(id) NOT NULL,
        timestamp_start real NOT NULL,
        timestamp_end real NOT NULL,
        claim_status text NOT NULL
      );
      CREATE TABLE IF NOT EXISTS "${schemaName}".media (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        url text NOT NULL,
        alt text,
        mime_type text NOT NULL,
        uploaded_by uuid,
        created_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS "${schemaName}".theme_config (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        theme_name text NOT NULL,
        config jsonb NOT NULL DEFAULT '{}',
        is_active boolean NOT NULL DEFAULT false
      );
      CREATE TABLE IF NOT EXISTS "${schemaName}".analytics (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        video_id uuid REFERENCES "${schemaName}".videos(id),
        event_type text NOT NULL,
        occurred_at timestamptz NOT NULL DEFAULT now()
      );
    `));

    // 4. Seed default theme_config rows
    await tx.execute(sql.raw(`
      INSERT INTO "${schemaName}".theme_config (theme_name, config, is_active)
      VALUES 
        ('classic', '{}', true),
        ('modern', '{}', false),
        ('minimalist', '{}', false)
      ON CONFLICT DO NOTHING;
    `));
  });
  
  console.log(`Tenant ${blogId} provisioned successfully.`);
}

export async function runTenantMigrations() {
  console.log('Running dynamic migrations across all tenant schemas...');
  const allBlogs = await db.select({ id: blogs.id }).from(blogs);
  for (const blog of allBlogs) {
    try {
      await provisionTenant(blog.id);
    } catch (e) {
      console.error(`Failed to migrate tenant ${blog.id}`, e);
    }
  }
  console.log('Finished migrating all tenants.');
}

