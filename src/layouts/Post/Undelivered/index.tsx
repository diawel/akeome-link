'use client'

import { useEffect, useRef, useState } from 'react'
import { StrapiApiListResponse } from '../../../utils/strapi'
import {
  getReservedCards,
  SecureReceivedCardAttributes,
} from '../../../utils/strapi/receivedCard'
import * as styles from './index.css'
import { FaArrowRight } from 'react-icons/fa6'
import { color } from '../../../utils/styleSchema'
import ListLoader from '../../../components/ListLoader'

type UndeliveredProps = {
  initialReservedCard: StrapiApiListResponse<SecureReceivedCardAttributes>
}

const Undelivered = ({ initialReservedCard }: UndeliveredProps) => {
  const [reservedCards, setReservedCards] = useState<
    StrapiApiListResponse<SecureReceivedCardAttributes>['data'] | undefined
  >(undefined)
  const [latestMeta, setLatestMeta] = useState<
    StrapiApiListResponse<SecureReceivedCardAttributes>['meta'] | undefined
  >(undefined)

  useEffect(() => {
    setReservedCards(initialReservedCard.data)
    setLatestMeta(initialReservedCard.meta)
  }, [initialReservedCard])

  if (!reservedCards || !latestMeta) {
    return null
  }

  return (
    <div className={styles.list}>
      {reservedCards.map((reservedCard, index) => {
        if (!reservedCard.attributes.card.data) {
          return null
        }
        const deliveryDate = new Date(
          reservedCard.attributes.card.data.attributes.deliveredAt
        )
        return (
          <div className={styles.listItem} key={index}>
            <div className={styles.titleBox}>
              <div className={styles.title}>
                {reservedCard.attributes.card.data.attributes.creatorName}
              </div>
              <div className={styles.deliveryDate}>
                {deliveryDate.getMonth() + 1}月{deliveryDate.getDate()}日
                {deliveryDate.getHours()}:
                {deliveryDate.getMinutes().toString().padStart(2, '0')}
                に配達予定
              </div>
            </div>
            <FaArrowRight color={color.gray[80]} size={24} />
          </div>
        )
      })}
      {latestMeta.pagination.pageCount > latestMeta.pagination.page && (
        <ListLoader
          loadMore={async () => {
            const nextPageReservedCards = await getReservedCards({
              page: latestMeta.pagination.page + 1,
              filter: 'undelivered',
            })
            if (nextPageReservedCards) {
              setReservedCards(reservedCards.concat(nextPageReservedCards.data))
              setLatestMeta(nextPageReservedCards.meta)
            }
          }}
        />
      )}
    </div>
  )
}

export default Undelivered
