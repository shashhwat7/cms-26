CREATE SCHEMA "tenant_template";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenant_template"."analytics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_id" uuid,
	"event_type" text NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenant_template"."copyright_registry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_id" uuid NOT NULL,
	"timestamp_start" real NOT NULL,
	"timestamp_end" real NOT NULL,
	"claim_status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenant_template"."engagement_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_id" uuid NOT NULL,
	"platform" text NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"comments" integer DEFAULT 0 NOT NULL,
	"recorded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenant_template"."media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"alt" text,
	"mime_type" text NOT NULL,
	"uploaded_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenant_template"."realtime_cache" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"channel_id" uuid NOT NULL,
	"platform" text NOT NULL,
	"metrics" jsonb NOT NULL,
	"fetched_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "realtime_cache_channel_id_unique" UNIQUE("channel_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenant_template"."social_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"platform" text NOT NULL,
	"handle" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"expires_at" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenant_template"."videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"video_url" text,
	"hook_strength" real DEFAULT 0 NOT NULL,
	"trending_weight" real DEFAULT 1 NOT NULL,
	"duration_penalty" real DEFAULT 1 NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"scheduled_at" timestamp with time zone,
	"platforms" jsonb,
	"author_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tenant_template"."analytics" ADD CONSTRAINT "analytics_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "tenant_template"."videos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tenant_template"."copyright_registry" ADD CONSTRAINT "copyright_registry_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "tenant_template"."videos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tenant_template"."engagement_metrics" ADD CONSTRAINT "engagement_metrics_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "tenant_template"."videos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tenant_template"."realtime_cache" ADD CONSTRAINT "realtime_cache_channel_id_social_accounts_id_fk" FOREIGN KEY ("channel_id") REFERENCES "tenant_template"."social_accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
