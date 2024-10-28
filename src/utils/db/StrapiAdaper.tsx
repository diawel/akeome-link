'use client'

import { useSession } from 'next-auth/react'
import { deleteAllLocalReceivedCard, getAllLocalReceivedCard } from '.'
import { useEffect } from 'react'
import { addUniqueReceivedCard } from '../strapi/receivedCard'

const StrapiAdaper = () => {
  const session = useSession()
  useEffect(() => {
    if (session.status !== 'authenticated') return
    if (!session.data) return
    getAllLocalReceivedCard().then((localReceivedCards) => {
      Promise.all(
        localReceivedCards
          .filter(
            (recievedCard) =>
              session.data.user.strapiUserId !== recievedCard.creatorId
          )
          .map((recievedCard) =>
            addUniqueReceivedCard({
              card: {
                id: recievedCard.cardId,
              },
            })
          )
      ).then(() => {
        deleteAllLocalReceivedCard()
      })
    })
  }, [session])
  return null
}

export default StrapiAdaper
