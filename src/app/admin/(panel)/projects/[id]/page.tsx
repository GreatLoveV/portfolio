import { eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { saveProject } from '@/app/admin/actions/projects'
import styles from '@/components/admin/admin.module.css'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { Heading } from '@/components/ui/type'
import { db } from '@/db'
import { projects } from '@/db/schema'
import { requireAdmin } from '@/lib/guard'
import { idSchema } from '@/lib/validation'

export const metadata: Metadata = { title: 'Edit project' }

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()

  const id = idSchema.safeParse((await params).id)
  if (!id.success) notFound()

  const [project] = await db.select().from(projects).where(eq(projects.id, id.data))
  if (!project) notFound()

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Edit {project.title}
        </Heading>
      </header>
      <ProjectForm action={saveProject.bind(null, project.id)} project={project} />
    </>
  )
}
