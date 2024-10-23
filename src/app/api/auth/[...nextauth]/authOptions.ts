import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { StrapiError, StrapiLoginResponse } from '../../../../utils/strapi'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (
        account &&
        account.provider === 'google' &&
        profile &&
        'email_verified' in profile
      ) {
        if (!profile.email_verified) return false
      }
      return true
    },

    async jwt({ token, account }) {
      if (account) {
        if (account.provider === 'google') {
          try {
            const strapiResponse = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
              { cache: 'no-cache' }
            )
            if (!strapiResponse.ok) {
              const strapiError: StrapiError = await strapiResponse.json()
              throw new Error(strapiError.error.message)
            }
            const strapiLoginResponse: StrapiLoginResponse =
              await strapiResponse.json()
            token.strapiToken = strapiLoginResponse.jwt
            token.strapiUserId = strapiLoginResponse.user.id
            token.provider = account.provider
            token.blocked = strapiLoginResponse.user.blocked
          } catch (error) {
            throw error
          }
        }
      }

      return token
    },
    async session({ token, session }) {
      session.strapiToken = token.strapiToken
      session.provider = token.provider
      session.user.strapiUserId = token.strapiUserId
      session.user.blocked = token.blocked

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
