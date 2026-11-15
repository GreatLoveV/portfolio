'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Container } from '@/components/ui/layout'

import styles from './site.module.css'

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/design', label: 'Design' },
  { href: '/contact', label: 'Contact' },
]

export function SiteNav() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <a href="#content" className={styles.skip}>
        Skip to content
      </a>
      <Container className={styles.headerInner}>
        <Link href="/" className={styles.name}>
          Wael Ettazi
        </Link>
        <nav aria-label="Main">
          <ul role="list" className={styles.navList}>
            {links.map(({ href, label }) => {
              const current = pathname === href || pathname.startsWith(`${href}/`)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`${styles.navLink} ink-link`}
                    aria-current={current ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
