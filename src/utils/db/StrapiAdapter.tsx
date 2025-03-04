'use client'

import { useSession } from 'next-auth/react'
import { deleteAllLocalReceivedCard, getAllLocalReceivedCard } from '.'
import { useEffect } from 'react'
import { addUniqueReceivedCard } from '../strapi/receivedCard'

const StrapiAdapter = () => {
  const session = useSession()
  useEffect(() => {
    if (session.status !== 'authenticated') return
    if (!session.data) return
    getAllLocalReceivedCard().then((localReceivedCards) => {
      Promise.all(
        localReceivedCards
          .filter(
            (receivedCard) =>
              session.data.user.strapiUserId !== receivedCard.creatorId
          )
          .map((receivedCard) =>
            addUniqueReceivedCard({
              shareId: receivedCard.shareId,
              randomSeed: receivedCard.randomSeed,
            })
          )
      ).then(() => {
        deleteAllLocalReceivedCard()
      })
    })
  }, [session])
  return null
}

export default StrapiAdapter
