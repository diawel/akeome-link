export type UserAttributes = {
  username: string
  email: string
  provider: 'google' | 'local'
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
}
