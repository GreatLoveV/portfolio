'use client'

import { useId, useState } from 'react'

import { Markdown } from '@/components/Markdown'

import styles from './admin.module.css'

type MarkdownEditorProps = {
  label: string
  name: string
  defaultValue: string
  error?: string
}

export function MarkdownEditor({
  label,
  name,
  defaultValue,
  error,
}: MarkdownEditorProps) {
  const [value, setValue] = useState(defaultValue)
  const id = useId()

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.editor}>
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={styles.editorInput}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <div className={styles.editorPreview} aria-label="Live preview" role="region">
          {value.trim() ? (
            <Markdown>{value}</Markdown>
          ) : (
            <p className={styles.hint}>The preview appears as you type.</p>
          )}
        </div>
      </div>
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}
