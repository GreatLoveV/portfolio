'use client'

import Image from 'next/image'
import { useId, useState, useTransition } from 'react'

import { uploadFile } from '@/app/admin/actions/uploads'

import styles from './admin.module.css'

type UploadFieldProps = {
  label: string
  name: string
  defaultValue: string
  kind?: 'image' | 'pdf'
  error?: string
}

export function UploadField({
  label,
  name,
  defaultValue,
  kind = 'image',
  error,
}: UploadFieldProps) {
  const [url, setUrl] = useState(defaultValue)
  const [uploadError, setUploadError] = useState('')
  const [pending, startTransition] = useTransition()
  const id = useId()
  const shownError = uploadError || error

  function upload(file: File | undefined) {
    if (!file) return
    const data = new FormData()
    data.set('file', file)
    setUploadError('')
    startTransition(async () => {
      const result = await uploadFile(kind, data)
      if ('url' in result) setUrl(result.url)
      else setUploadError(result.error)
    })
  }

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input type="hidden" name={name} value={url} />
      <div className={styles.upload}>
        {url && kind === 'image' && (
          <Image src={url} alt="" width={96} height={96} className={styles.thumb} />
        )}
        {url && kind === 'pdf' && (
          <a href={url} target="_blank" rel="noreferrer">
            Open current file
          </a>
        )}
        <input
          id={id}
          type="file"
          className={styles.fileInput}
          accept={kind === 'pdf' ? 'application/pdf' : 'image/jpeg,image/png,image/webp'}
          disabled={pending}
          aria-describedby={shownError ? `${id}-error` : undefined}
          onChange={(event) => upload(event.target.files?.[0])}
        />
        {url && (
          <button type="button" className={styles.textButton} onClick={() => setUrl('')}>
            Remove
          </button>
        )}
      </div>
      {pending && (
        <p role="status" className={styles.hint}>
          Uploading
        </p>
      )}
      {shownError && (
        <p id={`${id}-error`} className={styles.error}>
          {shownError}
        </p>
      )}
    </div>
  )
}
