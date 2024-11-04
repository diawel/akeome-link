import { StrapiRecord } from '..'
import { CardAttributes } from './server'

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
