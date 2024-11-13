'use client'

import { QRCodeCanvas } from 'qrcode.react';
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
    <div>
      {shareUrl ? (
        <div>
          <QRCodeCanvas value={shareUrl} size={200} />
          <p>{shareUrl}</p>
          <p>{creatorName}</p>
        </div>
      ) : (
        <p>urlなし</p>
      )}
    </div>
  );
}

export default Qr
