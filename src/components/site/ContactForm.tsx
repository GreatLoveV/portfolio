'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { initialFormState, type FormState } from '@/lib/form-state'

import styles from './ContactForm.module.css'

type ContactFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>
}

export function ContactForm({ action }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(action, initialFormState)
  const errors = state.errors ?? {}
  const values = state.values ?? {}

  if (state.status === 'success') {
    return (
      <p className={styles.sent} role="status">
        {state.message}
      </p>
    )
  }

  return (
    <form action={formAction} className={styles.form}>
      <Field
        label="Your name"
        name="name"
        autoComplete="name"
        required
        defaultValue={values.name ?? ''}
        error={errors.name}
      />
      <Field
        label="Your email"
        name="email"
        type="email"
        autoComplete="email"
        required
        defaultValue={values.email ?? ''}
        error={errors.email}
      />
      <Field
        label="Message"
        name="body"
        multiline
        rows={7}
        required
        defaultValue={values.body ?? ''}
        error={errors.body}
      />
      <div className={styles.trap} aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className={styles.note}>I only use your details to reply to you.</p>
      <div className={styles.foot}>
        <Button type="submit" disabled={pending}>
          {pending ? 'Sending' : 'Send message'}
        </Button>
        {state.status === 'error' && state.message && (
          <p className={styles.error} role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  )
}
