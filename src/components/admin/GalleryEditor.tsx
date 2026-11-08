'use client'

import Image from 'next/image'
import { useId, useState, useTransition } from 'react'

import { uploadFile } from '@/app/admin/actions/uploads'
import type { GalleryImage } from '@/db/schema'

import styles from './admin.module.css'

type GalleryEditorProps = {
  name: string
  defaultValue: GalleryImage[]
  error?: string
}

export function GalleryEditor({ name, defaultValue, error }: GalleryEditorProps) {
  const [items, setItems] = useState(defaultValue)
  const [uploadError, setUploadError] = useState('')
  const [pending, startTransition] = useTransition()
  const id = useId()

  function add(file: File | undefined) {
    if (!file) return
    const data = new FormData()
    data.set('file', file)
    setUploadError('')
    startTransition(async () => {
      const result = await uploadFile('image', data)
      if ('url' in result) {
        setItems((current) => [...current, { url: result.url, alt: '' }])
      } else {
        setUploadError(result.error)
      }
    })
  }

  function move(index: number, direction: -1 | 1) {
    setItems((current) => {
      const next = [...current]
      const [item] = next.splice(index, 1)
      next.splice(index + direction, 0, item)
      return next
    })
  }

  const shownError = uploadError || error

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        Gallery images
      </label>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <div className={styles.galleryList}>
        {items.map((item, index) => (
          <div key={item.url} className={styles.galleryItem}>
            <Image
              src={item.url}
              alt=""
              width={96}
              height={96}
              className={styles.thumb}
            />
            <div className={styles.fieldGroup}>
              <label htmlFor={`${id}-${index}`} className={styles.label}>
                Describe image {index + 1}
              </label>
              <input
                id={`${id}-${index}`}
                className={styles.select}
                value={item.alt}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((entry, i) =>
                      i === index ? { ...entry, alt: event.target.value } : entry,
                    ),
                  )
                }
              />
              <div className={styles.galleryActions}>
                <button
                  type="button"
                  className={styles.textButton}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                >
                  Move up
                </button>
                <button
                  type="button"
                  className={styles.textButton}
                  disabled={index === items.length - 1}
                  onClick={() => move(index, 1)}
                >
                  Move down
                </button>
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={() =>
                    setItems((current) => current.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <input
        id={id}
        type="file"
        className={styles.fileInput}
        accept="image/jpeg,image/png,image/webp"
        disabled={pending}
        onChange={(event) => {
          add(event.target.files?.[0])
          event.target.value = ''
        }}
      />
      {pending && (
        <p role="status" className={styles.hint}>
          Uploading
        </p>
      )}
      {shownError && <p className={styles.error}>{shownError}</p>}
    </div>
  )
}
