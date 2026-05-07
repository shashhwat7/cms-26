import { pgSchema, uuid, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';

export const tenantSchema = pgSchema('tenant_template');

const statusEnum = text('status', { enum: ['draft', 'scheduled', 'published'] });

import { integer, real } from 'drizzle-orm/pg-core';

export const videos = tenantSchema.table('videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title'),
  videoUrl: text('video_url'),
  hookStrength: real('hook_strength').default(0).notNull(),
  trendingWeight: real('trending_weight').default(1.0).notNull(),
  durationPenalty: real('duration_penalty').default(1.0).notNull(),
  status: statusEnum.notNull().default('draft'),
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
  platforms: jsonb('platforms').$type<string[]>(), // ['instagram', 'tiktok']
  authorId: uuid('author_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const socialAccounts = tenantSchema.table('social_accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  platform: text('platform').notNull(), // 'instagram', 'tiktok', 'youtube'
  handle: text('handle').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const engagementMetrics = tenantSchema.table('engagement_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  videoId: uuid('video_id').references(() => videos.id).notNull(),
  platform: text('platform').notNull(), // 'youtube', 'tiktok', 'instagram'
  views: integer('views').default(0).notNull(),
  likes: integer('likes').default(0).notNull(),
  comments: integer('comments').default(0).notNull(),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
});

export const copyrightRegistry = tenantSchema.table('copyright_registry', {
  id: uuid('id').primaryKey().defaultRandom(),
  videoId: uuid('video_id').references(() => videos.id).notNull(),
  timestampStart: real('timestamp_start').notNull(),
  timestampEnd: real('timestamp_end').notNull(),
  claimStatus: text('claim_status').notNull(), // 'safe', 'risk', 'flagged'
});

export const media = tenantSchema.table('media', {
  id: uuid('id').primaryKey().defaultRandom(),
  url: text('url').notNull(),
  alt: text('alt'),
  mimeType: text('mime_type').notNull(),
  uploadedBy: uuid('uploaded_by'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const analytics = tenantSchema.table('analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  videoId: uuid('video_id').references(() => videos.id),
  eventType: text('event_type').notNull(),
  occurredAt: timestamp('occurred_at', { withTimezone: true }).defaultNow().notNull(),
});

export const realtimeCache = tenantSchema.table('realtime_cache', {
  id: uuid('id').primaryKey().defaultRandom(),
  channelId: uuid('channel_id').references(() => socialAccounts.id, { onDelete: 'cascade' }).unique().notNull(),
  platform: text('platform').notNull(),
  metrics: jsonb('metrics').notNull(),
  fetchedAt: timestamp('fetched_at', { withTimezone: true }).defaultNow().notNull(),
});
