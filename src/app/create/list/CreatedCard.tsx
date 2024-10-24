'use client'

import { Card } from '../../../utils/strapi/card'

type CreatedCardProps = {
  createdCards: Card[]
}

export const CreatedCard = ({ createdCards }: CreatedCardProps) => {
  return <pre>{JSON.stringify(createdCards)}</pre>
}
