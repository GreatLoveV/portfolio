import { useId } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

import styles from './Field.module.css'

type Common = {
  label: string
  hint?: string
  error?: string
}

type InputProps = Common & InputHTMLAttributes<HTMLInputElement> & { multiline?: false }
type TextareaProps = Common &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true }

export function Field(props: InputProps | TextareaProps) {
  const { label, hint, error, id: givenId, className, multiline, ...rest } = props
  const generatedId = useId()
  const id = givenId ?? generatedId
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  const shared = {
    id,
    className: [styles.control, className].filter(Boolean).join(' '),
    'aria-invalid': error ? true : undefined,
    'aria-describedby': [hintId, errorId].filter(Boolean).join(' ') || undefined,
  }

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={5}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          {...shared}
        />
      ) : (
        <input {...(rest as InputHTMLAttributes<HTMLInputElement>)} {...shared} />
      )}
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}
