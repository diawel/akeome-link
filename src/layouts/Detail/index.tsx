'use client'

import Card from '../../components/Card'
import * as styles from './index.css'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import { useEffect, useState } from 'react'
import { CardAttributes } from '../../utils/strapi/card'
import ReturnButton from '../../components/ReturnButton'
import { color } from '../../utils/styleSchema'

type DetailProps = {
  cardAttributes: CardAttributes
}

const Detail = ({ cardAttributes }: DetailProps) => {
  const [shareUrl, setShareUrl] = useState('')
  useEffect(() => {
    setShareUrl(
      new URL(`/link/${cardAttributes.shareId}`, window.location.href).href
    )
  }, [cardAttributes.shareId])
  return (
    <>
      <div>
        <div className={styles.control}>
            <ReturnButton href="/create/list" color={color.gray[5]} />
        </div>

        <div className={styles.container}>
          <div className={styles.center}>
            <div className={styles.title}>{cardAttributes.title}</div>
          </div>
          <div className={styles.center}>
            <div className={styles.creatorName}>{cardAttributes.creatorName}</div>
          </div>
          <div className={styles.cardSpace}>
            <div className={styles.card}>
              <Card
                layout={cardAttributes.view.layout}
                background={cardAttributes.view.background}
                userImages={mediaRecordsToUrlSet(
                  cardAttributes.userImages.data
                )}
                randomVariants="hidden"
              />
            </div>
          </div>
          <button
            className={styles.primaryButton}
            // onClick={}
          >
            SNSで共有する
          </button>
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