'use client'

import Card from '../../components/Card'
import postImage from './post.svg'
import xIcon from './icon-x.svg'
import Image from 'next/image'
import * as styles from './index.css'
import copyIcon from './icon-copy.svg'
import copiedIcon from './icon-copied.svg'
import copiedPopup from './copied-pop-up.svg'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapi/strapiImage'
import { StrapiRecord } from '../../utils/strapi'
import Renderer from '../../components/Card/Renderer'
import { useRef, useState, useSyncExternalStore } from 'react'
import { CardAttributes, DraftCardAttributes } from '../../utils/strapi/card'
import { FaArrowUpFromBracket, FaDownload, FaQrcode } from 'react-icons/fa6'

type ShareProps = {
  cardRecord: StrapiRecord<CardAttributes | DraftCardAttributes>
}

const Share = ({ cardRecord }: ShareProps) => {
  const [renderedImage, setRenderedImage] = useState<Blob | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareUrl = useSyncExternalStore(
    () => () => {},
    () => {
      return new URL(
        `/link/${cardRecord.attributes.shareId}`,
        window.location.href
      ).href
    },
    () => ''
  )

  const isWebShareSupported = useSyncExternalStore(
    () => () => {},
    () => typeof navigator.share === 'function',
    () => true
  )

  const shareUrlInputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div>
        <div className={styles.postContainer}>
          <Image
            className={styles.post}
            src={postImage}
            alt=""
            loading="eager"
          />
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
            <div
              className={`${styles.copiedPopup} ${copied ? '' : styles.hidden}`}
            >
              <Image src={copiedPopup} alt="copiedPopup" loading="eager" />
            </div>
            <div className={styles.linkBoxContent}>
              <input
                ref={shareUrlInputRef}
                type="text"
                value={shareUrl}
                readOnly
                className={styles.linkInput}
                onClick={() => shareUrlInputRef.current?.select()}
              />
              <button className={styles.copyButton} onClick={handleCopy}>
                <Image
                  src={copied ? copiedIcon : copyIcon}
                  alt="copyIcon"
                  loading="eager"
                />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.iconButtonContainer}>
            <Link
              className={styles.shareButton}
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                ['年賀状が届いています', '#あけおめリンク', shareUrl]
                  .filter((line) => Boolean(line))
                  .join('\n')
              )}`}
              target="_blank"
            >
              <Image
                src={xIcon}
                alt="xIcon"
                loading="eager"
                className={styles.icon}
              />
              ポスト
            </Link>
            <button
              className={styles.shareButton}
              onClick={() => {
                navigator
                  .share({
                    text: '年賀状が届いています',
                    url: shareUrl,
                  })
                  .catch(() => {})
              }}
              style={{
                pointerEvents: isWebShareSupported ? 'auto' : 'none',
                opacity: isWebShareSupported ? 1 : 0.5,
              }}
            >
              <FaArrowUpFromBracket size={20} />
              共有
            </button>
            <Link
              className={styles.shareButton}
              href={{
                pathname: `/share/${cardRecord.id}/qr`,
              }}
            >
              <FaQrcode size={20} />
              QR
            </Link>
            <button
              className={styles.shareButton}
              onClick={() => {
                if (!renderedImage) return
                const url = URL.createObjectURL(renderedImage)
                const newWindow = window.open(url, '_blank')
                if (newWindow) {
                  newWindow.onload = () => {
                    URL.revokeObjectURL(url)
                  }
                }
              }}
              style={{
                pointerEvents: renderedImage ? 'auto' : 'none',
                opacity: renderedImage ? 1 : 0.5,
              }}
            >
              <FaDownload size={20} />
              画像保存
            </button>
          </div>
          <div className={styles.buttonContainer}>
            <Link href="/create/list" className={styles.buttonContent}>
              <div className={styles.buttonText}>一覧に戻る</div>
            </Link>
          </div>
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
