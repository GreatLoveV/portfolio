'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/db'
import { siteSettings, type SocialLinks } from '@/db/schema'
import { formValues, invalidState, type FormState } from '@/lib/form-state'
import { requireAdmin } from '@/lib/guard'
import { settingsSchema } from '@/lib/validation'

export async function saveSettings(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin()

  const values = formValues(formData)
  const parsed = settingsSchema.safeParse(values)
  if (!parsed.success) return invalidState(parsed.error, values)

  const { github, linkedin, instagram, email, ...rest } = parsed.data
  const socialLinks: SocialLinks = {
    ...(github && { github }),
    ...(linkedin && { linkedin }),
    ...(instagram && { instagram }),
    ...(email && { email }),
  }
  const row = { ...rest, socialLinks }

  try {
    await db
      .insert(siteSettings)
      .values({ id: 1, ...row })
      .onConflictDoUpdate({ target: siteSettings.id, set: row })
  } catch (error) {
    console.error('Saving settings failed', error)
    return { status: 'error', message: 'Settings were not saved. Try again.', values }
  }

  revalidatePath('/', 'layout')
  return { status: 'success', message: 'Settings saved.' }
}
