'use server'

import { eq, not } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '@/db'
import { messages } from '@/db/schema'
import { requireAdmin } from '@/lib/guard'
import { idSchema } from '@/lib/validation'

const refreshAdmin = () => revalidatePath('/admin', 'layout')

export async function toggleMessageRead(id: string) {
  await requireAdmin()
  await db
    .update(messages)
    .set({ read: not(messages.read) })
    .where(eq(messages.id, idSchema.parse(id)))
  refreshAdmin()
}

export async function deleteMessage(id: string) {
  await requireAdmin()
  await db.delete(messages).where(eq(messages.id, idSchema.parse(id)))
  refreshAdmin()
}
