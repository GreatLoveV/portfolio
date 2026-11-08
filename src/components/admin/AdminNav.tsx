'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './admin.module.css'

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/experience', label: 'Experience' },
  { href: '/admin/settings', label: 'Site settings' },
  { href: '/admin/messages', label: 'Messages' },
]

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Admin" className={styles.nav}>
      {links.map(({ href, label }) => {
        const current = href === '/admin' ? pathname === href : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={styles.navLink}
            aria-current={current ? 'page' : undefined}
          >
            {label}
            {href === '/admin/messages' && unread > 0 && (
              <span className={styles.count}>
                {unread}
                <span className="sr-only"> unread</span>
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
