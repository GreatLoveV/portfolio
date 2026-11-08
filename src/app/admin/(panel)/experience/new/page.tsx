import type { Metadata } from 'next'

import { saveExperience } from '@/app/admin/actions/experience'
import styles from '@/components/admin/admin.module.css'
import { ExperienceForm } from '@/components/admin/ExperienceForm'
import { Heading } from '@/components/ui/type'
import { requireAdmin } from '@/lib/guard'

export const metadata: Metadata = { title: 'Add entry' }

export default async function NewExperiencePage() {
  await requireAdmin()

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Add entry
        </Heading>
      </header>
      <ExperienceForm action={saveExperience.bind(null, null)} />
    </>
  )
}
