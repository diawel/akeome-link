import { StrapiRecord } from '..'
import { CardAttributes } from './server'

export const checkIsDelivered = (
  card: StrapiRecord<Pick<CardAttributes, 'isExpress' | 'publishedAt'>>
) => {
  if (card.attributes.isExpress) return true
  const now = new Date()
  const publishedAt = new Date(card.attributes.publishedAt)
  if (publishedAt.getMonth() === 0) {
    const deliveredAt = new Date(
      publishedAt.getFullYear(),
      publishedAt.getMonth(),
      publishedAt.getDate() + 1,
      6
    )
    return now >= deliveredAt
  }
  return now.getFullYear() > publishedAt.getFullYear()
}
