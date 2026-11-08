'use client'

import type { ReactNode } from 'react'

import styles from './admin.module.css'

/** A submit button that asks first. Used for anything that can't be undone. */
export function ConfirmButton({
  question,
  children,
}: {
  question: string
  children: ReactNode
}) {
  return (
    <button
      type="submit"
      className={`${styles.textButton} ${styles.danger}`}
      onClick={(event) => {
        if (!window.confirm(question)) event.preventDefault()
      }}
    >
      {children}
    </button>
  )
}
