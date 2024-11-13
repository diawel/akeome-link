'use client'

import Link from 'next/link'
import { StrapiApiListResponse } from '../../../utils/strapi'
import { CardAttributes, DraftCardAttributes } from '../../../utils/strapi/card'
import * as styles from './index.css'
import { FaPen, FaPlus } from 'react-icons/fa6'
import { mediaRecordsToUrlSet } from '../../../utils/strapi/strapiImage'
import Card from '../../../components/Card'
import { useState } from 'react'

type CreatedProps = {
  initialCards: StrapiApiListResponse<CardAttributes | DraftCardAttributes>
}

const Created = ({ initialCards }: CreatedProps) => {
  const [cards, setCards] = useState(initialCards)
  return (
    <div className={styles.container}>
      {cards.data.length > 0 ? (
        <div className={styles.cardContainer}>
          <Link href="/create/new" className={styles.cardLink}>
            <div className={styles.newCardButtonSizeInner}>
              <div className={styles.newCardButtonContent}>
                <div>
                  <FaPlus className={styles.newCardButtonIcon} />
                </div>
              </div>
            </div>
            <div className={styles.newCardButtonTextContainer}>
              <div className={styles.newCardButtonText}>新規作成</div>
            </div>
          </Link>

          {cards.data.map((card, index) => (
            <div className={styles.content} key={index}>
              <Link
                href={`/create/detail/${card.id}`}
                className={styles.cardLink}
              >
                <div className={styles.card}>
                  <Card
                    layout={card.attributes.view.layout}
                    background={card.attributes.view.background}
                    userImages={mediaRecordsToUrlSet(
                      card.attributes.userImages.data
                    )}
                    maxFormat="small"
                  />
                </div>
                {card.attributes.publishedAt === null ? (
                  <div className={styles.draftCardTitle}>
                    <FaPen size={16} />
                    下書き
                  </div>
                ) : (
                  <div className={styles.cardTitle}>
                    {card.attributes.title}
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Link href="/create/new" className={styles.cardLink}>
          <div className={styles.newCardContainer}>
            <FaPlus className={styles.newCardIcon} />
            <div className={styles.newCardText}>年賀状を新規作成</div>
          </div>
        </Link>
      )}
    </div>
  )
}

export default Created
