import 'server-only'

import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { isAdminGithubId } from '@/lib/admin-id'

/** Call at the top of every admin page and Server Action. The proxy is not enough alone. */
export async function requireAdmin() {
  const session = await auth()
  if (!isAdminGithubId(session?.user?.githubId)) redirect('/admin/login')
  return session
}
