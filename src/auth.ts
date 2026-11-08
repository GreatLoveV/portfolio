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
      return isAdminGithubId(session?.user?.githubId)
    },
  },
})
