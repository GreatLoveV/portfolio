import { getSettings, SITE_NAME } from '@/lib/content'
import { renderOgImage } from '@/lib/og'

export const revalidate = 3600

// A route rather than an opengraph-image file, because that file would always
// win over the share image chosen in the admin's site settings.
export async function GET() {
  const settings = await getSettings()
  return renderOgImage(settings.heroTitle || SITE_NAME)
}
