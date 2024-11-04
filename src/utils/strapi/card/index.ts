import { StrapiRecord } from '..'
import { CardBackground, CardLayout } from '../../../components/Card'
import { MediaAttributes } from '../media'
import { UserAttributes } from '../user'

export type CardAttributes = {
  title: string
  creatorName: string
  view: {
    background: CardBackground
    layout: CardLayout
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
  userImages: { data: StrapiRecord<MediaAttributes>[] }
  creator: { data: StrapiRecord<UserAttributes> }
  shareId: string
  isExpress: boolean
}

export const checkIsDelivered = (
  card: StrapiRecord<Pick<CardAttributes, 'isExpress' | 'publishedAt'>>
) => {
  if (card.attributes.isExpress) return true
  const now = new Date()
  const publishedAt = new Date(card.attributes.publishedAt)
  if (publishedAt.getMonth() === 0) {
    return now.getTime() - publishedAt.getTime() > 1000 * 60 * 60 * 24
  }
  return now.getFullYear() > publishedAt.getFullYear()
}
