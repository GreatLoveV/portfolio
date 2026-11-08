import { desc } from 'drizzle-orm'
import type { Metadata } from 'next'

import styles from '@/components/admin/admin.module.css'
import { MessageItem } from '@/components/admin/MessageItem'
import { Heading } from '@/components/ui/type'
import { db } from '@/db'
import { messages } from '@/db/schema'
import { requireAdmin } from '@/lib/guard'

export const metadata: Metadata = { title: 'Messages' }

export default async function MessagesPage() {
  await requireAdmin()
  const rows = await db.select().from(messages).orderBy(desc(messages.createdAt))

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Messages
        </Heading>
      </header>
      {rows.length === 0 ? (
        <p className={styles.empty}>Messages from the contact form will appear here.</p>
      ) : (
        rows.map((message) => <MessageItem key={message.id} message={message} />)
      )}
    </>
  )
}
