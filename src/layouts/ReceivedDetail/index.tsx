'use client'

import { FaDownload, FaPrint } from 'react-icons/fa6'
import Card from '../../components/Card'
import { StrapiRecord } from '../../utils/strapi'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import * as styles from './index.css'
import Renderer from '../../components/Card/Renderer'
import { useState } from 'react'
import Print from '../../components/Print'
import { CardAttributes } from '../../utils/strapi/card'
import ReturnButton from '../../components/ReturnButton'
import { color } from '../../utils/styleSchema'
import Link from 'next/link'

type ReceivedDetailProps = {
  cardRecord: StrapiRecord<
    Pick<CardAttributes, 'creatorName' | 'view' | 'userImages'>
  >
  randomSeed: number
}

const ReceivedDetail = ({ cardRecord, randomSeed }: ReceivedDetailProps) => {
  const [renderedImage, setRenderedImage] = useState<Blob | null>(null)
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.screen}>
          <div className={styles.metaContainer}>
            <ReturnButton href="/receive/list" color={color.gray[5]} />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>
              {cardRecord.attributes.creatorName}
            </div>
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
            <div className={styles.control}>
              <Link
                className={
                  styles.primaryButton[renderedImage ? 'default' : 'disabled']
                }
                href="" // 初期状態では空
                onClick={(e) => {
                  if (!renderedImage) {
                    e.preventDefault()
                    return
                  }
                  const url = URL.createObjectURL(renderedImage)
                  const link = e.target
                  if ('href' in link && link instanceof HTMLAnchorElement) {
                    link.href = url
                    const newWindow = window.open(url, '_blank')
                    if (newWindow) {
                      newWindow.onload = () => {
                        URL.revokeObjectURL(url)
                      }
                    }
                  }
                }}
              >
                <FaDownload />
                保存
              </Link>
              <button
                className={
                  styles.primaryButton[renderedImage ? 'default' : 'disabled']
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
        layout={cardRecord.attributes.view.layout}
        background={cardRecord.attributes.view.background}
        userImages={mediaRecordsToUrlSet(cardRecord.attributes.userImages.data)}
        onRender={(image) => setRenderedImage(image)}
        randomSeed={randomSeed}
      />
    </>
  )
}

export default ReceivedDetail
