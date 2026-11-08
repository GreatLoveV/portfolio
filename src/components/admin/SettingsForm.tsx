'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import type { siteSettings } from '@/db/schema'
import { initialFormState, type FormState } from '@/lib/form-state'

import styles from './admin.module.css'
import { FormStatus } from './FormStatus'
import { MarkdownEditor } from './MarkdownEditor'
import { UploadField } from './UploadField'

type SettingsFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>
  settings?: typeof siteSettings.$inferSelect
}

export function SettingsForm({ action, settings }: SettingsFormProps) {
  const [state, formAction, pending] = useActionState(action, initialFormState)
  const errors = state.errors ?? {}
  const value = (key: string, fallback: string | null | undefined) =>
    state.values?.[key] ?? fallback ?? ''
  const social = settings?.socialLinks

  return (
    <form action={formAction} className={styles.form}>
      <Field
        label="Hero title"
        name="heroTitle"
        required
        defaultValue={value('heroTitle', settings?.heroTitle)}
        error={errors.heroTitle}
      />
      <Field
        label="Hero subtitle"
        name="heroSubtitle"
        required
        multiline
        rows={2}
        defaultValue={value('heroSubtitle', settings?.heroSubtitle)}
        error={errors.heroSubtitle}
      />
      <Field
        label="Availability"
        name="availability"
        hint='For example, "Open to work".'
        defaultValue={value('availability', settings?.availability)}
        error={errors.availability}
      />
      <MarkdownEditor
        label="About text (Markdown)"
        name="aboutBody"
        defaultValue={value('aboutBody', settings?.aboutBody)}
        error={errors.aboutBody}
      />
      <UploadField
        label="CV (PDF)"
        name="cvUrl"
        kind="pdf"
        defaultValue={value('cvUrl', settings?.cvUrl)}
        error={errors.cvUrl}
      />
      <div className={styles.formRow}>
        <Field
          label="GitHub link"
          name="github"
          type="url"
          defaultValue={value('github', social?.github)}
          error={errors.github}
        />
        <Field
          label="LinkedIn link"
          name="linkedin"
          type="url"
          defaultValue={value('linkedin', social?.linkedin)}
          error={errors.linkedin}
        />
        <Field
          label="Instagram link"
          name="instagram"
          type="url"
          defaultValue={value('instagram', social?.instagram)}
          error={errors.instagram}
        />
        <Field
          label="Public email"
          name="email"
          type="email"
          defaultValue={value('email', social?.email)}
          error={errors.email}
        />
      </div>
      <Field
        label="Search title"
        name="seoTitle"
        defaultValue={value('seoTitle', settings?.seoTitle)}
        error={errors.seoTitle}
      />
      <Field
        label="Search description"
        name="seoDescription"
        multiline
        rows={2}
        defaultValue={value('seoDescription', settings?.seoDescription)}
        error={errors.seoDescription}
      />
      <UploadField
        label="Default sharing image"
        name="seoImage"
        defaultValue={value('seoImage', settings?.seoImage)}
        error={errors.seoImage}
      />
      <div className={styles.formFoot}>
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving' : 'Save settings'}
        </Button>
        {state.message && <FormStatus state={state} />}
      </div>
    </form>
  )
}
