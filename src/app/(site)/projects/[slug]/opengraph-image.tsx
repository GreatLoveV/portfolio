import { getPublishedProject, SITE_NAME } from '@/lib/content'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = `A project by ${SITE_NAME}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const revalidate = 3600

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getPublishedProject(slug)
  return renderOgImage(project?.title ?? SITE_NAME)
}
