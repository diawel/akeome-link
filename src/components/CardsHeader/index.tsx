import React, { useState } from 'react'
import * as styles from './index.css'
import akeomeLinkLogo from './akeome-link-logo.svg'
import postIcon from './icon-post.svg'
import Image from 'next/image'
const CardsHeader: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'created' | 'received'>('created')

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          <Image
            className={styles.icon}
            src={akeomeLinkLogo}
            alt="akeomeLinkLogo"
          />
        </div>
        <div className={styles.notificationIcon}>
          <Image src={postIcon} alt="postIcon" />
          <div className={styles.notificationCount}>5</div>
        </div>
      </div>

      <div className={styles.tabContainer}>
        <div
          className={`${styles.tab} ${
            activeTab === 'created' ? styles.activeTab : ''
          }`}
          onClick={() => setActiveTab('created')}
        >
          つくった
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === 'received' ? styles.activeTab : ''
          }`}
          onClick={() => setActiveTab('received')}
        >
          もらった
        </div>
      </div>
    </>
  )
}

export default CardsHeader
