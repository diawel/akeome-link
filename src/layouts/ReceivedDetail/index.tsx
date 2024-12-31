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
              <button
                className={
                  styles.primaryButton[renderedImage ? 'default' : 'disabled']
                }
                onClick={() => {
                  if (!renderedImage) return
                  const url = URL.createObjectURL(renderedImage)
                  const newWindow = window.open(url, '_blank')
                  if (newWindow) {
                    newWindow.onload = () => URL.revokeObjectURL(url)
                  }
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
