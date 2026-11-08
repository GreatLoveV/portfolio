'use server'

import { createHash } from 'node:crypto'

import { lt, sql } from 'drizzle-orm'
import { headers } from 'next/headers'

import { db } from '@/db'
import { messages, rateLimits } from '@/db/schema'
import {
  formValues,
  initialFormState,
  invalidState,
  type FormState,
} from '@/lib/form-state'
import { contactSchema } from '@/lib/validation'

const MAX_PER_WINDOW = 5
const SENT: FormState = { status: 'success', message: 'Message sent. I reply by email.' }

async function isRateLimited() {
  const requestHeaders = await headers()
  const ip = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const key = createHash('sha256')
    .update(`contact:${ip}:${process.env.AUTH_SECRET ?? ''}`)
    .digest('hex')

  const expired = sql`${rateLimits.windowStart} < now() - interval '1 hour'`
  const [row] = await db
    .insert(rateLimits)
    .values({ key, count: 1 })
    .onConflictDoUpdate({
      target: rateLimits.key,
      set: {
        count: sql`case when ${expired} then 1 else ${rateLimits.count} + 1 end`,
        windowStart: sql`case when ${expired} then now() else ${rateLimits.windowStart} end`,
      },
    })
    .returning({ count: rateLimits.count })

  return row.count > MAX_PER_WINDOW
}

export async function sendMessage(_: FormState, formData: FormData): Promise<FormState> {
  // Only bots fill this hidden field. Tell them it worked and store nothing.
  if (formData.get('company')) return SENT

  const values = formValues(formData)
  const parsed = contactSchema.safeParse({
    name: values.name ?? '',
    email: (values.email ?? '').trim(),
    body: values.body ?? '',
  })
  if (!parsed.success) return invalidState(parsed.error, values)

  try {
    if (await isRateLimited()) {
      return {
        ...initialFormState,
        status: 'error',
        message: 'Too many messages from this connection. Try again in an hour.',
        values,
      }
    }

    await db.insert(messages).values(parsed.data)
    await db
      .delete(rateLimits)
      .where(lt(rateLimits.windowStart, sql`now() - interval '1 day'`))
  } catch (error) {
    console.error('Contact form failed', error)
    return {
      status: 'error',
      message: 'Your message could not be sent. Try again in a moment.',
      values,
    }
  }

  return SENT
}
