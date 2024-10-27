'use client'

import { CardAttributes } from '../../utils/strapi/card'
import Card from '../../components/Card'
import postImage from './post.svg'
import xIcon from './icon-x.svg'
import lineIcon from './icon-line.svg'
import downloadIcon from './icon-download.svg'
import Image from 'next/image'
import * as styles from './index.css'
import copyIcon from './icon-copy.svg'
import Link from 'next/link'
import { mediaRecordsToUrlSet } from '../../utils/strapiImage'
import { StrapiRecord } from '../../utils/strapi'

type DetailProps = {
  cardRecord: StrapiRecord<CardAttributes>
}

const Detail = ({ cardRecord }: DetailProps) => {
  const shareUrl = new URL(`/link/${cardRecord.id}`, window.location.href).href
  return (
    <>
      <div>
        <div className={styles.postContainer}>
          <Image className={styles.post} src={postImage} alt="postImage" />
          <div className={styles.card}>
            <Card
              layout={cardRecord.attributes.layout}
              userImages={mediaRecordsToUrlSet(
                cardRecord.attributes.userImages.data
              )}
              maxFormat="thumbnail"
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
              )}&text=年賀状が届いています`}
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
            <div className={styles.downloadContainer}>
              <div className={styles.downloadContent}>
                <Image src={downloadIcon} alt="downLoadIcon"></Image>
                <div className={styles.downloadText}>画像として保存</div>
              </div>
            </div>
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
    </>
  )
}

export default Detail
