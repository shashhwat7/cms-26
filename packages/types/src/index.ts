import { JSONContent } from '@tiptap/core';

export interface ThemeProps {
  title: string;
  content: JSONContent | null;
  htmlContent?: string;
  config: Record<string, unknown>;
}

export interface Post {
  id: string;
  title: string | null;
  slug: string | null;
  content: JSONContent | null;
  status: 'draft' | 'scheduled' | 'published';
  scheduledAt: string | null;
  authorId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  id: string;
  slug: string;
  ownerUserId: string;
  plan: string;
  createdAt: string;
}

export interface TenantContext {
  tenantId: string;
  schema: string;
  role: 'owner' | 'editor' | 'viewer';
}
