'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/db'
import { designs } from '@/db/schema'
import { formValues, invalidState, type FormState } from '@/lib/form-state'
import { requireAdmin } from '@/lib/guard'
import { designSchema, idSchema } from '@/lib/validation'

export async function saveDesign(
  id: string | null,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin()

  const values = formValues(formData)
  const parsed = designSchema.safeParse(values)
  if (!parsed.success) return invalidState(parsed.error, values)

  try {
    if (id) {
      await db
        .update(designs)
        .set(parsed.data)
        .where(eq(designs.id, idSchema.parse(id)))
    } else {
      await db.insert(designs).values(parsed.data)
    }
  } catch (error) {
    console.error('Saving design failed', error)
    return { status: 'error', message: 'The design was not saved. Try again.', values }
  }

  revalidatePath('/', 'layout')
  redirect('/admin/designs')
}

export async function deleteDesign(id: string) {
  await requireAdmin()
  await db.delete(designs).where(eq(designs.id, idSchema.parse(id)))
  revalidatePath('/', 'layout')
}
