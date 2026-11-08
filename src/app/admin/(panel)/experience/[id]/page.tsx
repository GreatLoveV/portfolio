import { eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { saveExperience } from '@/app/admin/actions/experience'
import styles from '@/components/admin/admin.module.css'
import { ExperienceForm } from '@/components/admin/ExperienceForm'
import { Heading } from '@/components/ui/type'
import { db } from '@/db'
import { experience } from '@/db/schema'
import { requireAdmin } from '@/lib/guard'
import { idSchema } from '@/lib/validation'

export const metadata: Metadata = { title: 'Edit entry' }

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()

  const id = idSchema.safeParse((await params).id)
  if (!id.success) notFound()

  const [entry] = await db.select().from(experience).where(eq(experience.id, id.data))
  if (!entry) notFound()

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Edit {entry.title}
        </Heading>
      </header>
      <ExperienceForm action={saveExperience.bind(null, entry.id)} entry={entry} />
    </>
  )
}
