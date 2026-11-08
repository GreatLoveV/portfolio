import type { ZodError } from 'zod'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Record<string, string>
  /** What the person typed, so a failed save doesn't clear the form. */
  values?: Record<string, string>
}

export const initialFormState: FormState = { status: 'idle' }

export function formValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {}
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string' && !key.startsWith('$ACTION')) values[key] = value
  }
  return values
}

export function invalidState(error: ZodError, values: Record<string, string>): FormState {
  const errors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    errors[key] ??= issue.message
  }
  return {
    status: 'error',
    message: 'Fix the highlighted fields, then save.',
    errors,
    values,
  }
}

/** Postgres unique_violation, wherever the driver or ORM has put the code. */
export function isUniqueViolation(error: unknown): boolean {
  const e = error as { code?: string; cause?: { code?: string } }
  return e?.code === '23505' || e?.cause?.code === '23505'
}
