import { Cursor } from '@/components/site/Cursor'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteNav } from '@/components/site/SiteNav'
import { Atmosphere } from '@/components/ui/Atmosphere'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <noscript>
        <style>
          {
            '[data-reveal]{opacity:1!important;clip-path:none!important;transform:none!important}'
          }
        </style>
      </noscript>
      <Atmosphere />
      <SiteNav />
      <main id="content">{children}</main>
      <SiteFooter />
      <Cursor />
    </>
  )
}
