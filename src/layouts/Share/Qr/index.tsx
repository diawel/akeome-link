'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useState } from 'react'
import akeomeLinkLogo from './akeome-link-logo.svg'
import * as styles from './index.css'
import { color } from '../../../utils/styleSchema'
import Image from 'next/image'
import ReturnButton from '../../../components/ReturnButton'
import { CardAttributes, DraftCardAttributes } from '../../../utils/strapi/card'
import { StrapiRecord } from '../../../utils/strapi'

type QrProps = {
  cardRecord: StrapiRecord<CardAttributes | DraftCardAttributes>
}

const Qr = ({ cardRecord }: QrProps) => {
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    setShareUrl(
      new URL(`/link/${cardRecord.attributes.shareId}`, window.location.href)
        .href
    )
  }, [cardRecord.attributes.shareId])

  return (
    <div className={styles.container}>
      <div className={styles.returnButton}>
        <ReturnButton
          href={`/share/${cardRecord.id}`}
          color={color.gray[100]}
        />
      </div>
      <Image
        src={akeomeLinkLogo}
        alt="akeomeLinkLogo"
        priority
        className={styles.logo}
      />
      <div className={styles.qrCodeContainer}>
        <QRCodeCanvas value={shareUrl} size={215} className={styles.qrCode} />
      </div>
      <div className={styles.creatorNameContainer}>
        <div className={styles.creatorName}>
          {cardRecord.attributes.creatorName}
        </div>
        <div className={styles.discriptionText}>から年賀状を受け取ろう！</div>
      </div>
    </div>
  )
}

export default Qr
