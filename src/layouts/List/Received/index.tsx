'use client'

import Link from 'next/link'
import { StrapiApiListResponse } from '../../../utils/strapi'
import { SecureReceivedCardAttributes } from '../../../utils/strapi/receivedCard'
import * as styles from './index.css'
import { useState } from 'react'
import Card from '../../../components/Card'
import { mediaRecordsToUrlSet } from '../../../utils/strapi/strapiImage'

type ReceivedProps = {
  initialReceivedCards: StrapiApiListResponse<SecureReceivedCardAttributes>
}

const Received = ({ initialReceivedCards }: ReceivedProps) => {
  const [receivedCards, setReceivedCards] = useState(initialReceivedCards)
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        {receivedCards.data.map((receivedCard, index) => {
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
      </div>
    </div>
  )
}

export default Received
