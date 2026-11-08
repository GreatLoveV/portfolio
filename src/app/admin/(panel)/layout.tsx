import { count, eq } from 'drizzle-orm'
import Link from 'next/link'

import { signOut } from '@/auth'
import { AdminNav } from '@/components/admin/AdminNav'
import styles from '@/components/admin/admin.module.css'
import { db } from '@/db'
import { messages } from '@/db/schema'
import { requireAdmin } from '@/lib/guard'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  const [{ value: unread }] = await db
    .select({ value: count() })
    .from(messages)
    .where(eq(messages.read, false))

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <p className={styles.brand}>Portfolio admin</p>
        <AdminNav unread={unread} />
        <div className={styles.sidebarFoot}>
          <Link href="/" className={styles.navLink}>
            View site
          </Link>
          <form
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/admin/login' })
            }}
          >
            <button type="submit" className={styles.textButton}>
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
