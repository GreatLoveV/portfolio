'use client'

import Link from 'next/link'
import { useActionState, useId } from 'react'

import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import type { projects } from '@/db/schema'
import { initialFormState, type FormState } from '@/lib/form-state'

import styles from './admin.module.css'
import { FormStatus } from './FormStatus'
import { GalleryEditor } from './GalleryEditor'
import { MarkdownEditor } from './MarkdownEditor'
import { UploadField } from './UploadField'

type ProjectFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>
  project?: typeof projects.$inferSelect
}

export function ProjectForm({ action, project }: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, initialFormState)
  const statusId = useId()
  const errors = state.errors ?? {}
  const value = (key: string, fallback: string) => state.values?.[key] ?? fallback
  const featured = state.values ? state.values.featured === 'on' : project?.featured

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.formRow}>
        <Field
          label="Title"
          name="title"
          required
          defaultValue={value('title', project?.title ?? '')}
          error={errors.title}
        />
        <Field
          label="Web address"
          name="slug"
          hint="Leave blank to create it from the title."
          defaultValue={value('slug', project?.slug ?? '')}
          error={errors.slug}
        />
      </div>
      <Field
        label="Summary"
        name="summary"
        required
        multiline
        rows={2}
        defaultValue={value('summary', project?.summary ?? '')}
        error={errors.summary}
      />
      <div className={styles.formRow}>
        <Field
          label="Your role"
          name="role"
          defaultValue={value('role', project?.role ?? '')}
          error={errors.role}
        />
        <Field
          label="Stack"
          name="stack"
          hint="Separate tags with commas."
          defaultValue={value('stack', project?.stack.join(', ') ?? '')}
          error={errors.stack}
        />
      </div>
      <div className={styles.formRow}>
        <Field
          label="Code link"
          name="repoUrl"
          type="url"
          defaultValue={value('repoUrl', project?.repoUrl ?? '')}
          error={errors.repoUrl}
        />
        <Field
          label="Live link"
          name="liveUrl"
          type="url"
          defaultValue={value('liveUrl', project?.liveUrl ?? '')}
          error={errors.liveUrl}
        />
      </div>
      <MarkdownEditor
        label="Case study (Markdown)"
        name="body"
        defaultValue={value('body', project?.body ?? '')}
        error={errors.body}
      />
      <UploadField
        label="Cover image"
        name="coverImage"
        defaultValue={value('coverImage', project?.coverImage ?? '')}
        error={errors.coverImage}
      />
      <GalleryEditor
        name="gallery"
        defaultValue={project?.gallery ?? []}
        error={errors.gallery}
      />
      <div className={styles.formRow}>
        <div className={styles.fieldGroup}>
          <label htmlFor={statusId} className={styles.label}>
            Status
          </label>
          <select
            id={statusId}
            name="status"
            className={styles.select}
            // React resets the form after an action, and a select only keeps its value
            // if it remounts with the submitted one as its default.
            key={state.values?.status ?? 'initial'}
            defaultValue={value('status', project?.status ?? 'draft')}
          >
            <option value="draft">Draft, hidden from the site</option>
            <option value="published">Published</option>
          </select>
        </div>
        <Field
          label="Order"
          name="sortOrder"
          type="number"
          min={0}
          max={9999}
          required
          hint="Lower numbers appear first."
          defaultValue={value('sortOrder', String(project?.sortOrder ?? 0))}
          error={errors.sortOrder}
        />
      </div>
      <label className={styles.checkbox}>
        <input type="checkbox" name="featured" defaultChecked={featured} />
        Feature on the home page
      </label>
      <div className={styles.formFoot}>
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving' : 'Save project'}
        </Button>
        <Link href="/admin/projects">Cancel</Link>
        {state.message && <FormStatus state={state} />}
      </div>
    </form>
  )
}
