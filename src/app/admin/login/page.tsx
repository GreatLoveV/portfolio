import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { auth, signIn } from '@/auth'
import styles from '@/components/admin/admin.module.css'
import { Button } from '@/components/ui/Button'
import { Heading, Text } from '@/components/ui/type'
import { isAdminGithubId } from '@/lib/admin-id'

export const metadata: Metadata = { title: 'Sign in' }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>
}) {
  const session = await auth()
  if (isAdminGithubId(session?.user?.githubId)) redirect('/admin')

  const { error } = await searchParams

  return (
    <main className={styles.login}>
      <Heading as="h1" size="h3">
        Sign in to the admin
      </Heading>
      {error && (
        <Text className={styles.error} as="p">
          {error === 'AccessDenied'
            ? 'That GitHub account does not have access to this admin.'
            : 'Sign-in did not finish. Try again.'}
        </Text>
      )}
      <form
        action={async () => {
          'use server'
          await signIn('github', { redirectTo: '/admin' })
        }}
      >
        <Button type="submit">Continue with GitHub</Button>
      </form>
    </main>
  )
}
