import type { Metadata } from 'next'

import { saveDesign } from '@/app/admin/actions/designs'
import styles from '@/components/admin/admin.module.css'
import { DesignForm } from '@/components/admin/DesignForm'
import { Heading } from '@/components/ui/type'
import { requireAdmin } from '@/lib/guard'

export const metadata: Metadata = { title: 'Add design' }

export default async function NewDesignPage() {
  await requireAdmin()

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Add design
        </Heading>
      </header>
      <DesignForm action={saveDesign.bind(null, null)} />
    </>
  )
}
