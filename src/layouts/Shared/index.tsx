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
import { getLocalReceivedCard, putLocalReceivedCard } from '../../utils/db'
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
import cart from './cart.svg'
import pin from './pin.svg'
import LoginButton from '../../components/LoginButton'

type SharedProps = {
  cardCreatorId: number
  strapiUserId: number | undefined
  existingReceivedCard?: StrapiRecord<
    Pick<ReceivedCardAttributes, 'randomSeed' | 'publishedAt'>
  >
  shareId: string
} & (
  | {
      cardRecord: StrapiRecord<
        Pick<CardAttributes, 'shareId' | 'view' | 'userImages' | 'creatorName'>
      >
      isDelivered: true
    }
  | {
      cardRecord: StrapiRecord<
        Pick<CardAttributes, 'shareId' | 'creatorName' | 'deliveredAt'>
      >
      isDelivered: false
    }
)
const Shared = ({
  cardRecord,
  cardCreatorId,
  strapiUserId,
  shareId,
  isDelivered,
  existingReceivedCard,
}: SharedProps) => {
  const [renderedImage, setRenderedImage] = useState<Blob | null>(null)
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)
  const [randomSeed, setSeed] = useState<number | undefined>(undefined)
  const [isReceived, setIsReceived] = useState<boolean | undefined>(
    isDelivered ? undefined : false
  )
  const [isReserved, setIsReserved] = useState(
    existingReceivedCard !== undefined &&
      existingReceivedCard.attributes.publishedAt === null
  )
  const [isAlreadyReceived, setIsAlreadyReceived] = useState<
    boolean | undefined
  >(isDelivered ? undefined : false)

  useEffect(() => {
    if (isReceived === undefined) {
      if (strapiUserId === cardCreatorId) {
        setSeed(10000000 + Math.floor(Math.random() * 90000000))
        setIsReceived(false)
        setIsAlreadyReceived(false)
      } else if (existingReceivedCard) {
        setSeed(existingReceivedCard.attributes.randomSeed)
        setIsReceived(existingReceivedCard.attributes.publishedAt !== null)
        setIsAlreadyReceived(
          existingReceivedCard.attributes.publishedAt !== null
        )
      } else {
        getLocalReceivedCard(shareId).then((localReceivedCard) => {
          if (localReceivedCard) {
            setSeed(localReceivedCard.randomSeed)
            setIsReceived(true)
            setIsAlreadyReceived(true)
          } else {
            setIsReceived(false)
            setIsAlreadyReceived(false)
          }
        })
      }
    }
  }, [isReceived, existingReceivedCard, shareId, strapiUserId, cardCreatorId])

  const receive = async () => {
    if (isReceived) return
    setIsReceived(true)
    if (strapiUserId === cardCreatorId) return

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

  const reserve = async (strapiUserId: number) => {
    if (strapiUserId === cardCreatorId) return
    if (isReserved) return

    setIsReserved(true)
    await addUniqueReceivedCard({
      shareId: cardRecord.attributes.shareId,
      isReserve: true,
    })
  }

  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined)
  useEffect(() => {
    if (isDelivered) return
    setDeliveryDate(new Date(cardRecord.attributes.deliveredAt))
  }, [isDelivered, cardRecord.attributes])

  return (
    <>
      <div
        className={
          styles.container[
            isReceived === undefined
              ? 'loading'
              : isDelivered && !isReceived
              ? 'newArrival'
              : isReceived && !isAlreadyReceived
              ? 'revealing'
              : 'default'
          ]
        }
      >
        <div className={styles.backgroundContainer}>
          <div className={styles.patternContainer}>
            <Image
              src={pattern}
              alt=""
              className={styles.pattern}
              loading="eager"
            />
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
          <div
            className={
              styles.content[isDelivered ? 'delivered' : 'undelivered']
            }
          >
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
                      styles.cardContainer[isReceived ? 'received' : 'default']
                    }
                  >
                    <Card
                      layout={cardRecord.attributes.view.layout}
                      background={cardRecord.attributes.view.background}
                      userImages={mediaRecordsToUrlSet(
                        cardRecord.attributes.userImages.data
                      )}
                      randomVariants={isReceived ? 'revealing' : 'hidden'}
                      randomSeed={randomSeed}
                      revealDelay={1.5}
                    />
                    <div className={styles.emptyCardContainer}>
                      <Image
                        src={emptyCard}
                        alt=""
                        className={styles.emptyCard}
                      />
                      <div className={styles.emptyCardText}>
                        タップしてめくる
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <div
                className={
                  styles.daliveryAnimationContainer[
                    isReserved ? 'reserved' : 'default'
                  ]
                }
              >
                <div className={styles.bubbleContainer}>
                  <div className={styles.bubble}>
                    <div className={styles.bubbleInner}>予約完了！</div>
                  </div>
                </div>
                <div className={styles.cartContainer}>
                  <Image
                    src={cart}
                    alt=""
                    className={styles.cart}
                    loading="eager"
                  />
                  <Image
                    src={pin}
                    alt=""
                    className={styles.pin}
                    loading="eager"
                  />
                </div>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBar} />
                </div>
              </div>
            )}
            <div className={styles.controlContainer}>
              <div className={styles.control}>
                {isDelivered ? (
                  isReceived &&
                  (strapiUserId === cardCreatorId ? (
                    <Link className={styles.primaryButton} href="/create/list">
                      つくった年賀状一覧へ
                    </Link>
                  ) : strapiUserId !== undefined ? (
                    <Link className={styles.primaryButton} href="/receive/list">
                      もらった年賀状一覧へ
                    </Link>
                  ) : (
                    <LoginButton
                      className={styles.primaryButton}
                      callbackUrl="/create/new"
                    >
                      年賀状を作ってみる
                    </LoginButton>
                  ))
                ) : strapiUserId === cardCreatorId ? (
                  <Link className={styles.primaryButton} href="/create/list">
                    つくった年賀状一覧へ
                  </Link>
                ) : isReserved ? (
                  <Link className={styles.primaryButton} href="/create/new">
                    年賀状を作ってみる
                  </Link>
                ) : strapiUserId !== undefined ? (
                  <button
                    className={styles.primaryButton}
                    onClick={() => reserve(strapiUserId)}
                  >
                    受け取り予約する
                  </button>
                ) : (
                  <LoginButton className={styles.primaryButton}>
                    受け取り予約する
                  </LoginButton>
                )}
                {isDelivered && isReceived && (
                  <>
                    <Link
                      className={
                        styles.seconradyButton[
                          renderedImage ? 'default' : 'disabled'
                        ]
                      }
                      href={
                        renderedImage ? URL.createObjectURL(renderedImage) : ''
                      }
                      target="_blank"
                      onClick={(e) => {
                        if (!renderedImage) {
                          e.preventDefault()
                        }
                      }}
                    >
                      <FaDownload />
                      保存
                    </Link>
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
              {!isDelivered &&
                (isReserved ? (
                  <Link href="/" className={styles.deliveryDate.default}>
                    トップへ戻る
                  </Link>
                ) : deliveryDate ? (
                  <div className={styles.deliveryDate.default}>
                    {deliveryDate.getMonth() + 1}月{deliveryDate.getDate()}日
                    {deliveryDate.getHours()}:
                    {deliveryDate.getMinutes().toString().padStart(2, '0')}{' '}
                    から受け取ることができます
                  </div>
                ) : (
                  <div className={styles.deliveryDate.hidden}>
                    配達日時を取得中
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.cloudTop}>
            <Image
              src={cloud}
              alt=""
              className={styles.cloud}
              loading="eager"
            />
          </div>
          <div className={styles.cloudBottom}>
            <Image
              src={cloud}
              alt=""
              className={styles.cloud}
              style={{
                animationDelay: '-0.4s',
              }}
              loading="eager"
            />
          </div>
          <div className={styles.daruma}>
            <Image
              src={daruma}
              alt=""
              className={styles.daruma}
              loading="eager"
            />
          </div>
          <div className={styles.fuji}>
            <Image src={fuji} alt="" className={styles.fuji} loading="eager" />
          </div>
          <div className={styles.hana}>
            <Image src={hana} alt="" className={styles.hana} loading="eager" />
          </div>
          <div className={styles.matsu}>
            <Image
              src={matsu}
              alt=""
              className={styles.matsu}
              loading="eager"
            />
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
