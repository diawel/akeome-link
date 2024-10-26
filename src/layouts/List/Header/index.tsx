import React from 'react'
import * as styles from './index.css'
import akeomeLinkLogo from './akeome-link-logo.svg'
import postIcon from './icon-post.svg'
import Image from 'next/image'

type HeaderProps = {
  activeTab: 'created' | 'received'
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
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
        >
          つくった
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === 'received' ? styles.activeTab : ''
          }`}
        >
          もらった
        </div>
      </div>
    </>
  )
}

export default Header
