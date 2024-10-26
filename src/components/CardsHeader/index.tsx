import React from 'react'
import * as styles from './index.css'
import akeomeLinkLogo from './akeome-link-logo.svg'
import postIcon from './icon-post.svg'
import Image from 'next/image'

interface CardsHeaderProps {
  activeTab: 'created' | 'received'
  onTabChange: (tab: 'created' | 'received') => void
}

const CardsHeader: React.FC<CardsHeaderProps> = ({
  activeTab,
  onTabChange,
}) => {
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
          onClick={() => onTabChange('created')}
        >
          つくった
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === 'received' ? styles.activeTab : ''
          }`}
          onClick={() => onTabChange('received')}
        >
          もらった
        </div>
      </div>
    </>
  )
}

export default CardsHeader
