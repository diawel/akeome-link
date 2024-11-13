'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useState } from 'react'
import akeomeLinkLogo from './akeome-link-logo.svg'
import qrBackgroundImage from './qr-background.svg' 
import * as styles from './index.css'
import { color } from '../../../utils/styleSchema'
import Image from 'next/image'
import ReturnButton from '../../../components/ReturnButton'

type QrProps = {
  creatorName: string
  id: string
}

const Qr = ({ creatorName, id }: QrProps) => {
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    setShareUrl(
      new URL(`/link/${id}`, window.location.href)
        .href
    )
  }, [id])

  return (
    <>
      <div className={styles.backgroundImage}>
        <div className={styles.textOverlay}>
          <div className={styles.returnButtonSpace}>
            <div className={styles.returnButton}>
              <ReturnButton href="/create/list" color={color.gray[100]} />
            </div>
          </div>
          <div>
            <Image src={akeomeLinkLogo} alt='akeomeLinkLogo' />
            <div className={styles.qrCodeSpace}>
              <div className={styles.qrCode}>
                <QRCodeCanvas value={shareUrl} size={215} />
              </div>
            </div>
            <div className={styles.creatorName}>
              <div>{creatorName}</div>
            </div>
            <div className={styles.discriptionText}>から年賀状を受け取ろう！</div>
          </div>
        </div>
        <Image className={styles.image} src={qrBackgroundImage} alt="qrBackgroundImage" />
      </div>
    </>
  );
}

export default Qr

