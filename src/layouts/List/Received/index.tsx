'use client'

import Link from 'next/link'
import { StrapiApiListResponse } from '../../../utils/strapi'
import {
  getReceivedCards,
  SecureReceivedCardAttributes,
} from '../../../utils/strapi/receivedCard'
import * as styles from './index.css'
import { useState } from 'react'
import Card from '../../../components/Card'
import { mediaRecordsToUrlSet } from '../../../utils/strapi/strapiImage'
import ListLoader from '../../../components/ListLoader'
import Image from 'next/image'
import emptyPost from './empty-post.svg'

type ReceivedProps = {
  initialReceivedCards: StrapiApiListResponse<SecureReceivedCardAttributes>
}

const Received = ({ initialReceivedCards }: ReceivedProps) => {
  const [receivedCards, setReceivedCards] = useState(initialReceivedCards.data)
  const [latestMeta, setLatestMeta] = useState(initialReceivedCards.meta)

  return (
    <div className={styles.container}>
      {receivedCards.length > 0 ? (
        <div className={styles.cardContainer}>
          {receivedCards.map((receivedCard, index) => {
            if (
              !receivedCard.attributes.card ||
              !receivedCard.attributes.card.data
            ) {
              return null
            }
            return (
              <div className={styles.content} key={index}>
                <Link
                  href={`/receive/detail/${receivedCard.id}`}
                  className={styles.cardLink}
                >
                  <div className={styles.card}>
                    <Card
                      layout={
                        receivedCard.attributes.card.data.attributes.view.layout
                      }
                      background={
                        receivedCard.attributes.card.data.attributes.view
                          .background
                      }
                      userImages={mediaRecordsToUrlSet(
                        receivedCard.attributes.card.data.attributes.userImages
                          .data
                      )}
                      maxFormat="small"
                    />
                  </div>
                  <div className={styles.cardTitle}>
                    {receivedCard.attributes.card.data.attributes.creatorName}
                  </div>
                </Link>
              </div>
            )
          })}
          {latestMeta.pagination.pageCount > latestMeta.pagination.page && (
            <ListLoader
              loadMore={async () => {
                const nextPageReceivedCards = await getReceivedCards({
                  page: latestMeta.pagination.page + 1,
                })
                if (nextPageReceivedCards) {
                  setReceivedCards(
                    receivedCards.concat(nextPageReceivedCards.data)
                  )
                  setLatestMeta(nextPageReceivedCards.meta)
                }
              }}
              offset={20}
            />
          )}
        </div>
      ) : (
        <>
          <div className={styles.noCardContainer}>
            <div className={styles.noCardMessage}>
              友達と年賀状を共有しよう！
            </div>
          </div>
          <div className={styles.noCardContainer}>
            <Image src={emptyPost} alt="emptyPost"></Image>
          </div>
        </>
      )}
    </div>
  )
}

export default Received
