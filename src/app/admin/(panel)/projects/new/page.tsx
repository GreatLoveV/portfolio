import type { Metadata } from 'next'

import { saveProject } from '@/app/admin/actions/projects'
import styles from '@/components/admin/admin.module.css'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { Heading } from '@/components/ui/type'
import { requireAdmin } from '@/lib/guard'

export const metadata: Metadata = { title: 'Add project' }

export default async function NewProjectPage() {
  await requireAdmin()

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Add project
        </Heading>
      </header>
      <ProjectForm action={saveProject.bind(null, null)} />
    </>
  )
}
