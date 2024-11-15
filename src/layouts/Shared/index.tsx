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
import {
  addUniqueReceivedCard,
  ReceivedCardAttributes,
} from '../../utils/strapi/receivedCard'
import { putLocalReceivedCard } from '../../utils/db'
import { signIn } from 'next-auth/react'
import { CardAttributes } from '../../utils/strapi/card'
import Image from 'next/image'
import emptyCard from './empty-card.svg'
import pattern from './pattern.svg'
import bottomPattern from './bottom-pattern.svg'
import cloud from './cloud.svg'
import daruma from './daruma.svg'
import fuji from './fuji.svg'
import hana from './hana.svg'
import matsu from './matsu.svg'
import { color } from '../../utils/styleSchema'

type SharedProps = {
  cardCreatorId: number
  strapiUserId: number | undefined
  existingReceivedCard?: StrapiRecord<
    Pick<ReceivedCardAttributes, 'randomSeed' | 'publishedAt'>
  >
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
  existingReceivedCard,
}: SharedProps) => {
  const [renderedImage, setRenderedImage] = useState<Blob | null>(null)
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)
  const [randomSeed, setSeed] = useState<number | undefined>(
    existingReceivedCard?.attributes.randomSeed
  )
  const [isReceived, setIsReceived] = useState(
    existingReceivedCard !== undefined &&
      existingReceivedCard.attributes.publishedAt !== null
  )
  const [isReserved, setIsReserved] = useState(
    existingReceivedCard !== undefined &&
      existingReceivedCard.attributes.publishedAt === null
  )

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
      <div
        className={
          styles.container[
            isDelivered && !isReceived ? 'newArrival' : 'default'
          ]
        }
      >
        <div className={styles.backgroundContainer}>
          <div className={styles.patternContainer}>
            <Image src={pattern} alt="" className={styles.patterm} />
          </div>
          <div className={styles.bottomPatternContainer}>
            <Image
              src={bottomPattern}
              alt=""
              loading="eager"
              className={styles.bottomPattern}
            />
          </div>
        </div>
        <div className={styles.screen}>
          <div className={styles.content}>
            <div className={styles.title}>
              {strapiUserId === cardCreatorId ? (
                '共有した年賀状のプレビュー'
              ) : isDelivered ? (
                <>
                  {cardRecord.attributes.creatorName} さんから
                  <br />
                  年賀状を受け取りました
                </>
              ) : (
                <>
                  {cardRecord.attributes.creatorName} さんからの
                  <br />
                  年賀状は<span style={{ color: color.red[5] }}>配達中</span>
                  です
                </>
              )}
            </div>
            {isDelivered ? (
              <div className={styles.cardStageContaienr}>
                <button className={styles.cardStage} onClick={receive}>
                  <div
                    className={
                      styles.cardContainer[
                        existingReceivedCard
                          ? 'alreadyReceived'
                          : isReceived
                          ? 'received'
                          : 'default'
                      ]
                    }
                  >
                    <Card
                      layout={cardRecord.attributes.view.layout}
                      background={cardRecord.attributes.view.background}
                      userImages={mediaRecordsToUrlSet(
                        cardRecord.attributes.userImages.data
                      )}
                      randomVariants="revealing"
                      randomSeed={randomSeed}
                      revealDelay={existingReceivedCard ? undefined : 1.5}
                    />
                    <Image
                      src={emptyCard}
                      alt=""
                      className={styles.emptyCard}
                    />
                  </div>
                </button>
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
                isReceived && (
                  <Link className={styles.primaryButton} href="/receive/list">
                    もらった年賀状一覧へ
                  </Link>
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
                    {randomSeed !== undefined && (
                      <Renderer
                        layout={cardRecord.attributes.view.layout}
                        background={cardRecord.attributes.view.background}
                        userImages={mediaRecordsToUrlSet(
                          cardRecord.attributes.userImages.data
                        )}
                        onRender={(image) => setRenderedImage(image)}
                        randomSeed={randomSeed}
                      />
                    )}
                  </>
                )}
            </div>
          </div>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.cloudTop}>
            <Image src={cloud} alt="" className={styles.cloud} />
          </div>
          <div className={styles.cloudBottom}>
            <Image
              src={cloud}
              alt=""
              className={styles.cloud}
              style={{
                animationDelay: '-0.4s',
              }}
            />
          </div>
          <div className={styles.daruma}>
            <Image src={daruma} alt="" className={styles.daruma} />
          </div>
          <div className={styles.fuji}>
            <Image src={fuji} alt="" className={styles.fuji} />
          </div>
          <div className={styles.hana}>
            <Image src={hana} alt="" className={styles.hana} />
          </div>
          <div className={styles.matsu}>
            <Image src={matsu} alt="" className={styles.matsu} />
          </div>
        </div>
        {isPrintModalOpen && renderedImage && (
          <div className={styles.popupContainer}>
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
