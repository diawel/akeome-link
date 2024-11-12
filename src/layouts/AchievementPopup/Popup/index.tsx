'use client'

import illust from './illust.svg'
import Image from 'next/image'
import * as styles from './index.css'
import { useState } from 'react'

type PopupProps = {
  text: React.ReactNode
}

const Popup = ({ text }: PopupProps) => {
  const [isOpen, setIsOpen] = useState(true)
  if (!isOpen) return null

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Image src={illust} alt="" />
          <div className={styles.text}>{text}</div>
        </div>
        <button className={styles.button} onClick={() => setIsOpen(false)}>
          閉じる
        </button>
      </div>
    </div>
  )
}

export default Popup
