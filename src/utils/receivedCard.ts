import { addLocalReceivedCard } from './db'
import { addUniqueReceivedCard } from './strapi/receivedCard'

export const saveReceivedCard = async ({ cardId }: { cardId: number }) => {
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
}
