import { sql } from 'drizzle-orm'
import {
  boolean,
  check,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const projectStatus = pgEnum('project_status', ['draft', 'published'])
export const experienceType = pgEnum('experience_type', ['education', 'work', 'course'])

export type GalleryImage = { url: string; alt: string }
export type SocialLinks = {
  github?: string
  linkedin?: string
  instagram?: string
  email?: string
}

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}

export const projects = pgTable(
  'projects',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    summary: text('summary').notNull(),
    body: text('body').notNull().default(''),
    role: text('role').notNull().default(''),
    stack: text('stack')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    repoUrl: text('repo_url'),
    liveUrl: text('live_url'),
    coverImage: text('cover_image'),
    gallery: jsonb('gallery').$type<GalleryImage[]>().notNull().default([]),
    featured: boolean('featured').notNull().default(false),
    sortOrder: integer('sort_order').notNull().default(0),
    status: projectStatus('status').notNull().default('draft'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    ...timestamps,
  },
  (t) => [index('projects_status_sort_idx').on(t.status, t.sortOrder)],
)

export const experience = pgTable(
  'experience',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    type: experienceType('type').notNull(),
    title: text('title').notNull(),
    organisation: text('organisation').notNull(),
    location: text('location'),
    startDate: date('start_date').notNull(),
    endDate: date('end_date'),
    description: text('description').notNull().default(''),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  (t) => [index('experience_sort_idx').on(t.sortOrder)],
)

/** Single row, enforced by the check constraint on id. */
export const siteSettings = pgTable(
  'site_settings',
  {
    id: integer('id').primaryKey().default(1),
    heroTitle: text('hero_title').notNull(),
    heroSubtitle: text('hero_subtitle').notNull(),
    aboutBody: text('about_body').notNull().default(''),
    availability: text('availability').notNull().default(''),
    cvUrl: text('cv_url'),
    socialLinks: jsonb('social_links').$type<SocialLinks>().notNull().default({}),
    seoTitle: text('seo_title').notNull().default(''),
    seoDescription: text('seo_description').notNull().default(''),
    seoImage: text('seo_image'),
    updatedAt: timestamps.updatedAt,
  },
  (t) => [check('site_settings_single_row', sql`${t.id} = 1`)],
)

export const messages = pgTable(
  'messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    body: text('body').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    read: boolean('read').notNull().default(false),
  },
  (t) => [index('messages_created_idx').on(t.createdAt)],
)

/**
 * Fixed-window counters for the contact form. Not in the original brief: in-memory
 * counters do not survive between serverless invocations. Keys are hashed, never raw IPs.
 */
export const rateLimits = pgTable('rate_limits', {
  key: text('key').primaryKey(),
  count: integer('count').notNull().default(0),
  windowStart: timestamp('window_start', { withTimezone: true }).notNull().defaultNow(),
})
