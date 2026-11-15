import { and, asc, eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import { cache } from 'react'

import { db } from '@/db'
import { designs, experience, projects, siteSettings } from '@/db/schema'

export type Project = typeof projects.$inferSelect
export type Design = typeof designs.$inferSelect
export type ExperienceEntry = typeof experience.$inferSelect

/** How long a public page may be served before it is rebuilt. Saves in /admin refresh it at once. */
export const PUBLIC_REVALIDATE_SECONDS = 3600

export const SITE_NAME = 'Wael Ettazi'
export const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const emptySettings: typeof siteSettings.$inferSelect = {
  id: 1,
  heroTitle: SITE_NAME,
  heroSubtitle: '',
  aboutBody: '',
  availability: '',
  cvUrl: null,
  socialLinks: {},
  seoTitle: '',
  seoDescription: '',
  seoImage: null,
  updatedAt: new Date(0),
}

export const getSettings = cache(async () => {
  const [row] = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.id, 1))
    .limit(1)
  return row ?? emptySettings
})

export const getPublishedProjects = cache(async () =>
  db
    .select()
    .from(projects)
    .where(eq(projects.status, 'published'))
    .orderBy(asc(projects.sortOrder)),
)

export const getPublishedProject = cache(async (slug: string) => {
  const [row] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.status, 'published')))
    .limit(1)
  return row ?? null
})

export const getPublishedDesigns = cache(async () =>
  db
    .select()
    .from(designs)
    .where(eq(designs.published, true))
    .orderBy(asc(designs.sortOrder)),
)

export const getExperience = cache(async () =>
  db.select().from(experience).orderBy(asc(experience.sortOrder)),
)

/** Open Graph metadata replaces the parent's wholesale, so every page sets all of it. */
export async function pageMetadata(page: {
  title?: string
  description?: string
  path: string
}): Promise<Metadata> {
  const settings = await getSettings()
  const title = page.title ?? (settings.seoTitle || SITE_NAME)
  const description = page.description ?? settings.seoDescription

  return {
    title: page.title ?? { absolute: title },
    description,
    alternates: { canonical: page.path },
    openGraph: {
      title,
      description,
      url: page.path,
      siteName: SITE_NAME,
      type: 'website',
      images: [settings.seoImage ?? '/og-default'],
    },
    twitter: { card: 'summary_large_image' },
  }
}
