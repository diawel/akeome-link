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

type SharedProps = {
  cardRecord: StrapiRecord<CardAttributes>
  strapiUserId: number | undefined
}

const Shared = ({ cardRecord, strapiUserId }: SharedProps) => {
  const [renderedImage, setRenderedImage] = useState<Blob | null>(null)
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)

  useEffect(() => {
    if (!strapiUserId) {
      putLocalReceivedCard({
        cardId: cardRecord.id,
        creatorId: cardRecord.attributes.creator.data.id,
      })
    } else if (strapiUserId !== cardRecord.attributes.creator.data.id) {
      addUniqueReceivedCard({
        card: {
          id: cardRecord.id,
        },
      })
    }
  }, [cardRecord.attributes.creator.data.id, cardRecord.id, strapiUserId])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.screen}>
          <div className={styles.content}>
            <div className={styles.title}>
              {strapiUserId === cardRecord.attributes.creator.data.id
                ? '共有した年賀状のプレビュー'
                : `${cardRecord.attributes.creatorName} さんから年賀状を受け取りました`}
            </div>
            <div className={styles.cardContainer}>
              <Card
                layout={cardRecord.attributes.layout}
                userImages={mediaRecordsToUrlSet(
                  cardRecord.attributes.userImages.data
                )}
              />
            </div>
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
              <button
                className={
                  styles.seconradyButton[renderedImage ? 'default' : 'disabled']
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
                  styles.seconradyButton[renderedImage ? 'default' : 'disabled']
                }
                onClick={() => {
                  setIsPrintModalOpen(true)
                }}
              >
                <FaPrint />
                印刷
              </button>
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

      <Renderer
        layout={cardRecord.attributes.layout}
        userImages={mediaRecordsToUrlSet(cardRecord.attributes.userImages.data)}
        onRender={(image) => setRenderedImage(image)}
      />
    </>
  )
}

export default Shared
