import { redirect } from 'next/navigation'
import { getReservedCards } from '../../utils/strapi/receivedCard'
import { checkIsDelivered } from '../../utils/strapi/card'
import Link from 'next/link'

const Post = async () => {
  const reservedCards = await getReservedCards()
  if (!reservedCards) redirect('/')
  return (
    <div>
      <h1>Post</h1>
      <div>
        {reservedCards.data.map((receivedCard, index) => {
          if (!receivedCard.attributes.card.data) return
          const isDelivered = checkIsDelivered(
            receivedCard.attributes.card.data
          )
          return (
            <Link
              href={`/link/${receivedCard.attributes.card.data.attributes.shareId}`}
              key={index}
            >
              <div>
                {isDelivered
                  ? `配達済み: ${receivedCard.attributes.card.data.attributes.creatorName} さん`
                  : `配達中: ${receivedCard.attributes.card.data.attributes.creatorName} さん`}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Post
