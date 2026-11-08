import type { FormState } from '@/lib/form-state'

import styles from './admin.module.css'

export function FormStatus({ state }: { state: FormState }) {
  return (
    <p role="status" className={state.status === 'error' ? styles.error : styles.hint}>
      {state.message}
    </p>
  )
}
