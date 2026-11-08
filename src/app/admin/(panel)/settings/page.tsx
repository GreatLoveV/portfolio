import { eq } from 'drizzle-orm'
import type { Metadata } from 'next'

import { saveSettings } from '@/app/admin/actions/settings'
import styles from '@/components/admin/admin.module.css'
import { SettingsForm } from '@/components/admin/SettingsForm'
import { Heading } from '@/components/ui/type'
import { db } from '@/db'
import { siteSettings } from '@/db/schema'
import { requireAdmin } from '@/lib/guard'

export const metadata: Metadata = { title: 'Site settings' }

export default async function SettingsPage() {
  await requireAdmin()
  const [settings] = await db.select().from(siteSettings).where(eq(siteSettings.id, 1))

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Site settings
        </Heading>
      </header>
      <SettingsForm action={saveSettings} settings={settings} />
    </>
  )
}
