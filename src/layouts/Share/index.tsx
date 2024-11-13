'use client'

import Card from '../../components/Card'
import postImage from './post.svg'
import xIcon from './icon-x.svg'
import lineIcon from './icon-line.svg'
import qrIcon from './icon-qr.svg'
import downloadIcon from './icon-download.svg'
import Image from 'next/image'
import * as styles from './index.css'
import copyIcon from './icon-copy.svg'
import copiedIcon from './icon-copied.svg'
import copiedPopup from './copied-pop-up.svg'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import { StrapiRecord } from '../../utils/strapi'
import Renderer from '../../components/Card/Renderer'
import { useEffect, useState } from 'react'
import { CardAttributes } from '../../utils/strapi/card'

type ShareProps = {
  cardRecord: StrapiRecord<CardAttributes>
}

const Share = ({ cardRecord }: ShareProps) => {
  const [renderedImage, setRenderedImage] = useState<Blob | null>(null)
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div>
            <div className={`${styles.copiedPopup} ${copied ? '' : styles.hidden}`}>
              <Image src={copiedPopup} alt="copiedPopup" />
            </div>
            <div className={styles.linkBoxContent}>
              <input
                type="text"
                value={shareUrl}
                readOnly
                className={styles.linkInput}
              />
              <button
                className={styles.copyButton}
                onClick={handleCopy}
              >  
                <Image src={copied ? copiedIcon : copyIcon} alt="copyIcon"></Image>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.iconButtonContainer}>
          <div className={styles.buttonRightSpace}>
            <Link
              className={styles.xContainer}
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareUrl
              )}&text=年賀状が届いています #あけおめリンク`}
            >
              <Image src={xIcon} alt="xIcon"></Image>
            </Link>
            </div>
            <div className={styles.buttonRightSpace}>
              <Link
                className={styles.lineContainer}
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
                  shareUrl
                )}&text=年賀状が届いています`}
              >
                <Image src={lineIcon} alt="lineIcon"></Image>
              </Link>
            </div>
            <div className={styles.buttonRightSpace}>
              <Link
                className={styles.qrContainer}
                href={{
                  pathname: `/share/${cardRecord.attributes.shareId}/qr`,
                }}
              >
                <Image src={qrIcon} alt="lineIcon"></Image>
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

export default Share
