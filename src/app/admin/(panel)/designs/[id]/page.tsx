import { eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { saveDesign } from '@/app/admin/actions/designs'
import styles from '@/components/admin/admin.module.css'
import { DesignForm } from '@/components/admin/DesignForm'
import { Heading } from '@/components/ui/type'
import { db } from '@/db'
import { designs } from '@/db/schema'
import { requireAdmin } from '@/lib/guard'
import { idSchema } from '@/lib/validation'

export const metadata: Metadata = { title: 'Edit design' }

export default async function EditDesignPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()

  const id = idSchema.safeParse((await params).id)
  if (!id.success) notFound()

  const [design] = await db.select().from(designs).where(eq(designs.id, id.data))
  if (!design) notFound()

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Edit {design.title}
        </Heading>
      </header>
      <DesignForm action={saveDesign.bind(null, design.id)} design={design} />
    </>
  )
}
