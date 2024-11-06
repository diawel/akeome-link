'use client'

import { FaDownload, FaPrint } from 'react-icons/fa6'
import Card from '../../components/Card'
import { StrapiRecord } from '../../utils/strapi'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import * as styles from './index.css'
import Link from 'next/link'
import Renderer from '../../components/Card/Renderer'
import { useEffect, useState } from 'react'
import Print from '../../components/Print'
import { addUniqueReceivedCard } from '../../utils/strapi/receivedCard'
import { putLocalReceivedCard } from '../../utils/db'
import { signIn } from 'next-auth/react'
import { CardAttributes } from '../../utils/strapi/card'

type SharedProps = {
  cardCreatorId: number
  strapiUserId: number | undefined
  isAlreadyReceived: boolean
  isAlreadyReserved: boolean
} & (
  | {
      cardRecord: StrapiRecord<
        Pick<CardAttributes, 'shareId' | 'view' | 'userImages' | 'creatorName'>
      >
      isDelivered: true
    }
  | {
      cardRecord: StrapiRecord<Pick<CardAttributes, 'shareId' | 'creatorName'>>
      isDelivered: false
    }
)
const Shared = ({
  cardRecord,
  cardCreatorId,
  strapiUserId,
  isDelivered,
  isAlreadyReceived,
  isAlreadyReserved,
}: SharedProps) => {
  const [renderedImage, setRenderedImage] = useState<Blob | null>(null)
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)
  const [randomSeed, setSeed] = useState<number | undefined>(undefined)
  const [isReceived, setIsReceived] = useState(isAlreadyReceived)
  const [isReserved, setIsReserved] = useState(isAlreadyReserved)

  useEffect(() => {
    if (strapiUserId == cardCreatorId) {
      setSeed(10000000 + Math.floor(Math.random() * 90000000))
    }
  }, [cardCreatorId, strapiUserId])

  const receive = async () => {
    if (strapiUserId === cardCreatorId) return
    if (isReceived) return

    setIsReceived(true)
    if (!strapiUserId) {
      const localReceivedCard = await putLocalReceivedCard({
        shareId: cardRecord.attributes.shareId,
        creatorId: cardCreatorId,
      })
      setSeed(localReceivedCard?.randomSeed)
    } else {
      const receivedCard = await addUniqueReceivedCard({
        shareId: cardRecord.attributes.shareId,
      })
      setSeed(receivedCard?.data.attributes.randomSeed)
    }
  }

  const reserve = async () => {
    if (!strapiUserId) {
      signIn()
      return
    }
    if (strapiUserId === cardCreatorId) return
    if (isReserved) return

    setIsReserved(true)
    await addUniqueReceivedCard({
      shareId: cardRecord.attributes.shareId,
      isReserve: true,
    })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.screen}>
          <div className={styles.content}>
            <div className={styles.title}>
              {strapiUserId === cardCreatorId
                ? '共有した年賀状のプレビュー'
                : isDelivered
                ? isReceived
                  ? `${cardRecord.attributes.creatorName} さんから年賀状を受け取りました`
                  : `${cardRecord.attributes.creatorName} さんから年賀状が届いています`
                : isReserved
                ? `${cardRecord.attributes.creatorName} さんからの年賀状を配達中です`
                : `${cardRecord.attributes.creatorName} さんが年賀状を出しました`}
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
              {strapiUserId === cardCreatorId ? (
                <Link className={styles.primaryButton} href="/create/list">
                  つくった年賀状一覧へ
                </Link>
              ) : isDelivered ? (
                isReceived ? (
                  <Link className={styles.primaryButton} href="/receive/list">
                    もらった年賀状一覧へ
                  </Link>
                ) : (
                  <button className={styles.primaryButton} onClick={receive}>
                    受け取る
                  </button>
                )
              ) : isReserved ? (
                <Link className={styles.primaryButton} href="/create/new">
                  年賀状を作ってみる
                </Link>
              ) : (
                <button className={styles.primaryButton} onClick={reserve}>
                  受け取り予約する
                </button>
              )}
              {isDelivered &&
                (strapiUserId === cardCreatorId || isReceived) && (
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
                        a.setAttribute(
                          'download',
                          `new_year_card_${Date.now()}`
                        )
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
