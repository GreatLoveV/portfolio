import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'

import { isAdminGithubId } from '@/lib/admin-id'

declare module 'next-auth' {
  interface Session {
    user: { githubId?: string } & DefaultSession['user']
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    githubId?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 },
  pages: { signIn: '/admin/login', error: '/admin/login' },
  callbacks: {
    signIn({ account, profile }) {
      return account?.provider === 'github' && isAdminGithubId(String(profile?.id))
    },
    jwt({ token, account, profile }) {
      if (account?.provider === 'github' && profile) token.githubId = String(profile.id)
      return token
    },
    session({ session, token }) {
      session.user.githubId = token.githubId
      return session
    },
    authorized({ auth: session, request }) {
      if (request.nextUrl.pathname === '/admin/login') return true
      // A proxy redirect can't be read by a Server Action call, so a save with an
      // expired session would hang. Every action starts with requireAdmin(), which
      // refuses the request and redirects in a way the client can follow.
      if (request.method === 'POST' && request.headers.has('next-action')) return true
      return isAdminGithubId(session?.user?.githubId)
    },
  },
})
