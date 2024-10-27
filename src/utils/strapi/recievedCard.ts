import { StrapiRecord } from '.'
import { CardAttributes } from './card'
import { UserAttributes } from './user'

export type RecievedCardAttributes = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  card: { data: StrapiRecord<Omit<CardAttributes, 'userImages' | 'creator'>> }
  reciever: { data: StrapiRecord<UserAttributes> }
}
