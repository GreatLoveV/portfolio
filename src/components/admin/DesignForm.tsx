'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useActionState, useId, useState, useTransition } from 'react'

import { uploadDesignImage } from '@/app/admin/actions/uploads'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import type { designs } from '@/db/schema'
import { initialFormState, type FormState } from '@/lib/form-state'

import styles from './admin.module.css'
import { FormStatus } from './FormStatus'

type DesignFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>
  design?: typeof designs.$inferSelect
}

export function DesignForm({ action, design }: DesignFormProps) {
  const [state, formAction, pending] = useActionState(action, initialFormState)
  const errors = state.errors ?? {}
  const value = (key: string, fallback: string) => state.values?.[key] ?? fallback

  const published = state.values
    ? state.values.published === 'on'
    : (design?.published ?? true)

  const [image, setImage] = useState({
    url: value('imageUrl', design?.imageUrl ?? ''),
    width: value('width', String(design?.width ?? '')),
    height: value('height', String(design?.height ?? '')),
  })
  const [uploadError, setUploadError] = useState('')
  const [uploading, startUpload] = useTransition()
  const fileId = useId()
  const shownError = uploadError || errors.imageUrl

  function upload(file: File | undefined) {
    if (!file) return
    const data = new FormData()
    data.set('file', file)
    setUploadError('')
    startUpload(async () => {
      const result = await uploadDesignImage(data)
      if ('url' in result) {
        setImage({
          url: result.url,
          width: String(result.width),
          height: String(result.height),
        })
      } else {
        setUploadError(result.error)
      }
    })
  }

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="imageUrl" value={image.url} />
      <input type="hidden" name="width" value={image.width} />
      <input type="hidden" name="height" value={image.height} />

      <div className={styles.fieldGroup}>
        <label htmlFor={fileId} className={styles.label}>
          Image
        </label>
        {image.url && (
          <Image
            src={image.url}
            alt=""
            width={Number(image.width) || 400}
            height={Number(image.height) || 400}
            sizes="20rem"
            className={styles.designPreview}
          />
        )}
        <input
          id={fileId}
          type="file"
          className={styles.fileInput}
          accept="image/jpeg,image/png,image/webp"
          disabled={uploading}
          aria-describedby={shownError ? `${fileId}-error` : undefined}
          onChange={(event) => upload(event.target.files?.[0])}
        />
        <p className={styles.hint}>
          JPEG, PNG or WebP under 3.5 MB. Any shape works: the gallery keeps the
          proportions you upload.
        </p>
        {uploading && (
          <p role="status" className={styles.hint}>
            Uploading
          </p>
        )}
        {shownError && (
          <p id={`${fileId}-error`} className={styles.error}>
            {shownError}
          </p>
        )}
      </div>

      <Field
        label="Title"
        name="title"
        required
        defaultValue={value('title', design?.title ?? '')}
        error={errors.title}
      />
      <Field
        label="Image description"
        name="alt"
        required
        hint="For screen readers: say what is in the picture."
        defaultValue={value('alt', design?.alt ?? '')}
        error={errors.alt}
      />
      <Field
        label="Caption"
        name="caption"
        hint="Optional. Shown under the image when it is opened."
        defaultValue={value('caption', design?.caption ?? '')}
        error={errors.caption}
      />
      <Field
        label="Order"
        name="sortOrder"
        type="number"
        min={0}
        max={9999}
        required
        hint="Lower numbers appear first."
        defaultValue={value('sortOrder', String(design?.sortOrder ?? 0))}
        error={errors.sortOrder}
      />
      <label className={styles.checkbox}>
        <input type="checkbox" name="published" defaultChecked={published} />
        Show on the public Design page
      </label>

      <div className={styles.formFoot}>
        <Button type="submit" disabled={pending || uploading}>
          {pending ? 'Saving' : 'Save design'}
        </Button>
        <Link href="/admin/designs">Cancel</Link>
        {state.message && <FormStatus state={state} />}
      </div>
    </form>
  )
}
