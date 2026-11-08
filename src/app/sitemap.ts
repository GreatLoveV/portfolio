import type { MetadataRoute } from 'next'

import { getPublishedProjects, siteUrl } from '@/lib/content'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl()
  const projects = await getPublishedProjects()

  return [
    ...['', '/projects', '/about', '/design', '/contact'].map((path) => ({
      url: `${base}${path}`,
    })),
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: project.updatedAt,
    })),
  ]
}
