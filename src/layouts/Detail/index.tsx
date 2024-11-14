'use client'

import Card from '../../components/Card'
import * as styles from './index.css'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import { useEffect, useState } from 'react'
import { CardAttributes, DraftCardAttributes } from '../../utils/strapi/card'
import ReturnButton from '../../components/ReturnButton'
import { color } from '../../utils/styleSchema'
import { StrapiRecord } from '../../utils/strapi'

type DetailProps = {
  cardRecord: StrapiRecord<CardAttributes | DraftCardAttributes>
}

const Detail = ({ cardRecord }: DetailProps) => {
  const [shareUrl, setShareUrl] = useState('')
  useEffect(() => {
    setShareUrl(
      new URL(`/link/${cardRecord.attributes.shareId}`, window.location.href).href
    )
  }, [cardRecord.attributes.shareId])
  return (
    <>
      <div>
        <div className={styles.control}>
          <ReturnButton href="/create/list" color={color.gray[5]} />
        </div>
        <div className={styles.container}>
          <div className={styles.center}>
            <div className={styles.title}>{cardRecord.attributes.title}</div>
          </div>
          <div className={styles.center}>
            <div className={styles.creatorName}>{cardRecord.attributes.creatorName}</div>
          </div>
          <div className={styles.cardSpace}>
            <div className={styles.card}>
              <Card
                layout={cardRecord.attributes.view.layout}
                background={cardRecord.attributes.view.background}
                userImages={mediaRecordsToUrlSet(
                  cardRecord.attributes.userImages.data
                )}
                randomVariants="hidden"
              />
            </div>
          </div>
          <Link href={`/share/${cardRecord.id}`}>
            <button className={styles.primaryButton}>
              SNSで共有する
            </button>
          </Link> 
          <div className={styles.buttonContainer}>
            <div className={styles.buttonSpace}>
              <button
                className={styles.copyAndEditButton}
                // onClick={() => {}}
              >
                <div className={styles.buttonText}>コピーして編集</div>
              </button>
            </div>
            <button
              className={styles.deleteButton}
            >
              <div className={styles.buttonText}>削除</div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Detail