import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { enumType } from './utils'; // Placeholder for custom enum logic if needed, or use pgEnum

const planEnum = text('plan', { enum: ['free', 'pro', 'enterprise'] });
const roleEnum = text('role', { enum: ['owner', 'editor', 'viewer'] });

export const tenants = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').unique().notNull(),
  ownerUserId: uuid('owner_user_id').notNull(),
  plan: planEnum.notNull().default('free'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  youtubeToken: text('youtube_token'),
  tiktokToken: text('tiktok_token'),
  instagramToken: text('instagram_token'),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  hashedPassword: text('hashed_password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const tenantMemberships = pgTable('tenant_memberships', {
  tenantId: uuid('tenant_id').references(() => tenants.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  role: roleEnum.notNull(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  tenantId: uuid('tenant_id').references(() => tenants.id),
  expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
});
