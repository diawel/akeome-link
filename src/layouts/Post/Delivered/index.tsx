'use client'

import { useState } from 'react'
import { StrapiApiListResponse } from '../../../utils/strapi'
import {
  getReservedCards,
  receiveAllReservedCards,
  SecureReceivedCardAttributes,
} from '../../../utils/strapi/receivedCard'
import * as styles from './index.css'
import { FaArrowRight } from 'react-icons/fa6'
import { color } from '../../../utils/styleSchema'
import ListLoader from '../../../components/ListLoader'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type DeliveredProps = {
  initialReservedCard: StrapiApiListResponse<SecureReceivedCardAttributes>
}

const Delivered = ({ initialReservedCard }: DeliveredProps) => {
  const [reservedCards, setReservedCards] = useState(initialReservedCard.data)
  const [latestMeta, setLatestMeta] = useState(initialReservedCard.meta)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <div className={styles.list}>
        {reservedCards.map(
          (reservedCard, index) =>
            reservedCard.attributes.card.data && (
              <Link
                href={`/link/${reservedCard.attributes.card.data.attributes.shareId}`}
                className={styles.listItem}
                key={index}
              >
                <div className={styles.titleBox}>
                  <div className={styles.title}>
                    {reservedCard.attributes.card.data.attributes.creatorName}
                  </div>
                </div>
                <FaArrowRight color={color.red[5]} size={24} />
              </Link>
            )
        )}
        {latestMeta.pagination.pageCount > latestMeta.pagination.page && (
          <ListLoader
            loadMore={async () => {
              const nextPageReservedCards = await getReservedCards({
                page: latestMeta.pagination.page + 1,
                filter: 'delivered',
              })
              if (nextPageReservedCards) {
                setReservedCards(
                  reservedCards.concat(nextPageReservedCards.data)
                )
                setLatestMeta(nextPageReservedCards.meta)
              }
            }}
          />
        )}
      </div>
      {reservedCards.length >= 2 && (
        <button
          className={styles.floatingButton[isLoading ? 'disabled' : 'default']}
          onClick={() => {
            setIsLoading(true)
            receiveAllReservedCards()
              .then(() => {
                router.push('/receive/list')
              })
              .catch(() => {
                setIsLoading(false)
              })
          }}
        >
          まとめて受け取る
        </button>
      )}
    </>
  )
}

export default Delivered
