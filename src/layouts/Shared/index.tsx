'use client'

import { FaDownload, FaPrint } from 'react-icons/fa6'
import Card from '../../components/Card'
import { StrapiRecord } from '../../utils/strapi'
import { CardAttributes } from '../../utils/strapi/card'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import * as styles from './index.css'
import Link from 'next/link'
import Renderer from '../../components/Card/Renderer'
import { useEffect, useState } from 'react'
import Print from '../../components/Print'
import { addUniqueReceivedCard } from '../../utils/strapi/receivedCard'
import { putLocalReceivedCard } from '../../utils/db'

type SharedProps =
  | {
      cardRecord: StrapiRecord<Omit<CardAttributes, 'creator'>>
      cardCreatorId: number
      strapiUserId: number | undefined
      isDelivered: true
    }
  | {
      cardRecord: StrapiRecord<
        Omit<CardAttributes, 'creator' | 'view' | 'userImages'>
      >
      cardCreatorId: number
      strapiUserId: number | undefined
      isDelivered: false
    }

const Shared = ({
  cardRecord,
  cardCreatorId,
  strapiUserId,
  isDelivered,
}: SharedProps) => {
  const [renderedImage, setRenderedImage] = useState<Blob | null>(null)
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)
  const [randomSeed, setSeed] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (!strapiUserId) {
      putLocalReceivedCard({
        shareId: cardRecord.attributes.shareId,
        creatorId: cardCreatorId,
      }).then((record) => setSeed(record?.randomSeed))
    } else if (strapiUserId !== cardCreatorId) {
      addUniqueReceivedCard({
        shareId: cardRecord.attributes.shareId,
      }).then((record) => setSeed(record?.data.attributes.randomSeed))
    } else {
      setSeed(10000000 + Math.floor(Math.random() * 90000000))
    }
  }, [cardRecord, cardCreatorId, strapiUserId])

  if (!randomSeed) return null

  return (
    <>
      <div className={styles.container}>
        <div className={styles.screen}>
          <div className={styles.content}>
            <div className={styles.title}>
              {strapiUserId === cardCreatorId
                ? '共有した年賀状のプレビュー'
                : isDelivered
                ? `${cardRecord.attributes.creatorName} さんから年賀状を受け取りました`
                : `${cardRecord.attributes.creatorName} さんからの年賀状を配達中です`}
            </div>
            {isDelivered ? (
              <div className={styles.cardContainer}>
                <Card
                  layout={cardRecord.attributes.view.layout}
                  background={cardRecord.attributes.view.background}
                  userImages={mediaRecordsToUrlSet(
                    cardRecord.attributes.userImages.data
                  )}
                  randomVariants="revealing"
                  randomSeed={randomSeed}
                />
              </div>
            ) : (
              <div>配達中のアニメーション</div>
            )}

            <div className={styles.control}>
              {strapiUserId ? (
                <Link className={styles.primaryButton} href="/receive/list">
                  もらった年賀状一覧へ
                </Link>
              ) : (
                <Link className={styles.primaryButton} href="/create/new">
                  年賀状を作ってみる
                </Link>
              )}
              {isDelivered && (
                <>
                  <button
                    className={
                      styles.seconradyButton[
                        renderedImage ? 'default' : 'disabled'
                      ]
                    }
                    onClick={() => {
                      if (!renderedImage) return
                      const url = URL.createObjectURL(renderedImage)
                      const a = document.createElement('a')
                      a.href = url
                      a.setAttribute('download', `new_year_card_${Date.now()}`)
                      document.body.appendChild(a)
                      a.click()
                      URL.revokeObjectURL(url)
                      a.remove()
                    }}
                  >
                    <FaDownload />
                    保存
                  </button>
                  <button
                    className={
                      styles.seconradyButton[
                        renderedImage ? 'default' : 'disabled'
                      ]
                    }
                    onClick={() => {
                      setIsPrintModalOpen(true)
                    }}
                  >
                    <FaPrint />
                    印刷
                  </button>
                  <Renderer
                    layout={cardRecord.attributes.view.layout}
                    background={cardRecord.attributes.view.background}
                    userImages={mediaRecordsToUrlSet(
                      cardRecord.attributes.userImages.data
                    )}
                    onRender={(image) => setRenderedImage(image)}
                    randomSeed={randomSeed}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        {isPrintModalOpen && renderedImage && (
          <div className={styles.overlayContainer}>
            <Print
              image={renderedImage}
              onClose={() => setIsPrintModalOpen(false)}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Shared
