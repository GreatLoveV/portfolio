import { count, desc, eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import Link from 'next/link'

import styles from '@/components/admin/admin.module.css'
import { MessageItem } from '@/components/admin/MessageItem'
import { Heading } from '@/components/ui/type'
import { db } from '@/db'
import { experience, messages, projects } from '@/db/schema'
import { requireAdmin } from '@/lib/guard'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  await requireAdmin()

  const [[published], [drafts], [entries], [unread], recent] = await Promise.all([
    db.select({ value: count() }).from(projects).where(eq(projects.status, 'published')),
    db.select({ value: count() }).from(projects).where(eq(projects.status, 'draft')),
    db.select({ value: count() }).from(experience),
    db.select({ value: count() }).from(messages).where(eq(messages.read, false)),
    db.select().from(messages).orderBy(desc(messages.createdAt)).limit(5),
  ])

  const stats = [
    ['Published projects', published.value],
    ['Drafts', drafts.value],
    ['Experience entries', entries.value],
    ['Unread messages', unread.value],
  ] as const

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Dashboard
        </Heading>
      </header>
      <dl className={styles.stats}>
        {stats.map(([label, value]) => (
          <div key={label} className={styles.stat}>
            <dd className={styles.statValue}>{value}</dd>
            <dt className={styles.statLabel}>{label}</dt>
          </div>
        ))}
      </dl>
      <Heading size="h4" className={styles.sectionTitle}>
        Recent messages
      </Heading>
      {recent.length === 0 ? (
        <p className={styles.empty}>Messages from the contact form will appear here.</p>
      ) : (
        <>
          {recent.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          <p className={styles.tableFoot}>
            <Link href="/admin/messages">See all messages</Link>
          </p>
        </>
      )}
    </>
  )
}
