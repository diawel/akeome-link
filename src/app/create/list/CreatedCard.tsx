'use client'

import { StrapiApiListResponse } from '../../../utils/strapi'
import { CardAttributes } from '../../../utils/strapi/card'

type CreatedCardProps = {
  createdCards: StrapiApiListResponse<CardAttributes>
}

export const CreatedCard = ({ createdCards }: CreatedCardProps) => {
  return <pre>{JSON.stringify(createdCards)}</pre>
}
