export type StrapiUser = {
  id: number
  username: string
  email: string
  blocked: boolean
  provider: 'google'
}

export type StrapiLoginResponse = {
  jwt: string
  user: StrapiUser
}
