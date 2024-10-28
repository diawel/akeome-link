import { addLocalReceivedCard } from './db'
import { useEffect } from 'react'
import { addUniqueReceivedCard } from './strapi/receivedCard'

export const saveReceivedCard = async ({ cardId }: { cardId: number }) => {
  useEffect(() => {
    const strapiResponse = addUniqueReceivedCard({
      card: {
        id: cardId,
      },
    })
    if (!strapiResponse) {
      addLocalReceivedCard({
        cardId,
      })
    }
  }, [cardId])
}
