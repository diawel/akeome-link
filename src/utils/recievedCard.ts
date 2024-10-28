import { addLocalRecievedCard } from './db'
import { useEffect } from 'react'
import { addUniqueRecievedCard } from './strapi/recievedCard'

export const saveRecievedCard = async ({ cardId }: { cardId: number }) => {
  useEffect(() => {
    const strapiResponse = addUniqueRecievedCard({
      card: {
        id: cardId,
      },
    })
    if (!strapiResponse) {
      addLocalRecievedCard({
        cardId,
      })
    }
  }, [cardId])
}
