import { Container } from '@/components/ui/layout'
import { Meta } from '@/components/ui/type'
import { SITE_NAME, getSettings } from '@/lib/content'

import styles from './site.module.css'

export async function SiteFooter() {
  const { socialLinks: social } = await getSettings()
  const links = [
    social.email && { href: `mailto:${social.email}`, label: 'Email' },
    social.github && { href: social.github, label: 'GitHub' },
    social.linkedin && { href: social.linkedin, label: 'LinkedIn' },
    social.instagram && { href: social.instagram, label: 'Instagram' },
  ].filter((link) => !!link)

  return (
    <footer className={styles.footer}>
      <Container className={styles.footerInner}>
        <Meta as="p">
          {SITE_NAME}, {new Date().getFullYear()}
        </Meta>
        {links.length > 0 && (
          <ul role="list" className={styles.footerLinks}>
            {links.map(({ href, label }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </footer>
  )
}
