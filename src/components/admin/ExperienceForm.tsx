'use client'

import Link from 'next/link'
import { useActionState, useId } from 'react'

import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import type { experience } from '@/db/schema'
import { initialFormState, type FormState } from '@/lib/form-state'

import styles from './admin.module.css'
import { FormStatus } from './FormStatus'

type ExperienceFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>
  entry?: typeof experience.$inferSelect
}

export function ExperienceForm({ action, entry }: ExperienceFormProps) {
  const [state, formAction, pending] = useActionState(action, initialFormState)
  const typeId = useId()
  const errors = state.errors ?? {}
  const value = (key: string, fallback: string) => state.values?.[key] ?? fallback

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.fieldGroup}>
          <label htmlFor={typeId} className={styles.label}>
            Type
          </label>
          <select
            id={typeId}
            name="type"
            className={styles.select}
            // React resets the form after an action, and a select only keeps its value
            // if it remounts with the submitted one as its default.
            key={state.values?.type ?? 'initial'}
            defaultValue={value('type', entry?.type ?? 'education')}
          >
            <option value="education">Education</option>
            <option value="work">Work</option>
            <option value="course">Course</option>
          </select>
        </div>
        <Field
          label="Title"
          name="title"
          required
          defaultValue={value('title', entry?.title ?? '')}
          error={errors.title}
        />
      </div>
      <div className={styles.formRow}>
        <Field
          label="Organisation"
          name="organisation"
          required
          defaultValue={value('organisation', entry?.organisation ?? '')}
          error={errors.organisation}
        />
        <Field
          label="Location"
          name="location"
          defaultValue={value('location', entry?.location ?? '')}
          error={errors.location}
        />
      </div>
      <div className={styles.formRow}>
        <Field
          label="Start date"
          name="startDate"
          type="date"
          required
          defaultValue={value('startDate', entry?.startDate ?? '')}
          error={errors.startDate}
        />
        <Field
          label="End date"
          name="endDate"
          type="date"
          hint="Leave blank if it's ongoing."
          defaultValue={value('endDate', entry?.endDate ?? '')}
          error={errors.endDate}
        />
      </div>
      <Field
        label="Description"
        name="description"
        multiline
        defaultValue={value('description', entry?.description ?? '')}
        error={errors.description}
      />
      <Field
        label="Order"
        name="sortOrder"
        type="number"
        min={0}
        max={9999}
        required
        hint="Lower numbers appear first."
        defaultValue={value('sortOrder', String(entry?.sortOrder ?? 0))}
        error={errors.sortOrder}
      />
      <div className={styles.formFoot}>
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving' : 'Save entry'}
        </Button>
        <Link href="/admin/experience">Cancel</Link>
        {state.message && <FormStatus state={state} />}
      </div>
    </form>
  )
}
