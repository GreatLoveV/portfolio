'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/db'
import { experience } from '@/db/schema'
import { formValues, invalidState, type FormState } from '@/lib/form-state'
import { requireAdmin } from '@/lib/guard'
import { experienceSchema, idSchema } from '@/lib/validation'

export async function saveExperience(
  id: string | null,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin()

  const values = formValues(formData)
  const parsed = experienceSchema.safeParse(values)
  if (!parsed.success) return invalidState(parsed.error, values)

  try {
    if (id) {
      await db
        .update(experience)
        .set(parsed.data)
        .where(eq(experience.id, idSchema.parse(id)))
    } else {
      await db.insert(experience).values(parsed.data)
    }
  } catch (error) {
    console.error('Saving experience failed', error)
    return { status: 'error', message: 'The entry was not saved. Try again.', values }
  }

  revalidatePath('/', 'layout')
  redirect('/admin/experience')
}

export async function deleteExperience(id: string) {
  await requireAdmin()
  await db.delete(experience).where(eq(experience.id, idSchema.parse(id)))
  revalidatePath('/', 'layout')
}
