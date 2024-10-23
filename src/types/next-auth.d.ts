// https://next-auth.js.org/getting-started/typescript
// not sure about any of this but it throws no TS errors (anymore)

import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { StrapiUser } from './strapi/StrapiLogin'

declare module 'next-auth' {
  interface Session {
    strapiToken?: string
    provider?: 'google'
    user: User
  }

  interface User extends DefaultSession['user'] {
    strapiUserId?: number
    blocked?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    strapiUserId?: number
    blocked?: boolean
    strapiToken?: string
    provider?: 'google'
  }
}
