'use client'

import { CardAttributes } from '../../utils/strapi/card/server'
import Card from '../../components/Card'
import postImage from './post.svg'
import xIcon from './icon-x.svg'
import lineIcon from './icon-line.svg'
import downloadIcon from './icon-download.svg'
import Image from 'next/image'
import * as styles from './index.css'
import copyIcon from './icon-copy.svg'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import { StrapiRecord } from '../../utils/strapi'
import Renderer from '../../components/Card/Renderer'
import { useEffect, useState } from 'react'

type DetailProps = {
  cardRecord: StrapiRecord<CardAttributes>
}

const Detail = ({ cardRecord }: DetailProps) => {
  const [renderedImage, setRenderedImage] = useState<Blob | null>(null)
  const [shareUrl, setShareUrl] = useState('')
  useEffect(() => {
    setShareUrl(
      new URL(`/link/${cardRecord.attributes.shareId}`, window.location.href)
        .href
    )
  }, [cardRecord.attributes.shareId])
  return (
    <>
      <div>
        <div className={styles.postContainer}>
          <Image className={styles.post} src={postImage} alt="postImage" />
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

        <div className={styles.linkBoxContainer}>
          <div className={styles.linkBoxContent}>
            <input
              type="text"
              value={shareUrl}
              readOnly
              className={styles.linkInput}
            />
            <button
              className={styles.copyButton}
              onClick={() => {
                navigator.clipboard.writeText(shareUrl)
                alert('コピーしました')
              }}
            >
              <Image src={copyIcon} alt="copyIcon"></Image>
            </button>
          </div>
        </div>
        <div>
          <div className={styles.iconButtonContainer}>
            <Link
              className={styles.xContainer}
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareUrl
              )}&text=年賀状が届いています #あけおめリンク`}
            >
              <Image src={xIcon} alt="xIcon"></Image>
            </Link>
            <div className={styles.buttonSpace}>
              <Link
                className={styles.lineContainer}
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
                  shareUrl
                )}&text=年賀状が届いています`}
              >
                <Image src={lineIcon} alt="lineIcon"></Image>
              </Link>
            </div>
            <button
              className={styles.downloadContainer}
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
              style={{
                pointerEvents: renderedImage ? 'auto' : 'none',
                opacity: renderedImage ? 1 : 0.5,
              }}
            >
              <div className={styles.downloadContent}>
                <Image src={downloadIcon} alt="downLoadIcon"></Image>
                <div className={styles.downloadText}>画像として保存</div>
              </div>
            </button>
          </div>
          <Link href="/create/list" className={styles.cardLink}>
            <div className={styles.buttonContainer}>
              <div className={styles.buttonContent}>
                <div className={styles.buttonText}>一覧に戻る</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Renderer
        layout={cardRecord.attributes.view.layout}
        background={cardRecord.attributes.view.background}
        userImages={mediaRecordsToUrlSet(cardRecord.attributes.userImages.data)}
        onRender={setRenderedImage}
      />
    </>
  )
}

export default Detail
