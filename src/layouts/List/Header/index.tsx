import React from 'react'
import * as styles from './index.css'
import akeomeLinkLogo from './akeome-link-logo.svg'
import postIcon from './icon-post.svg'
import Image from 'next/image'
import Link from 'next/link'
import { getReservedCards } from '../../../utils/strapi/receivedCard'
import { redirect } from 'next/navigation'

type HeaderProps = {
  activeTab: 'created' | 'received'
}

const Header = async ({ activeTab }: HeaderProps) => {
  const reservedCards = await getReservedCards()
  if (!reservedCards) redirect('/')

  const newArrivalCount = reservedCards.data.filter(
    (receivedCard) =>
      receivedCard.attributes.card.data &&
      new Date(receivedCard.attributes.card.data.attributes.deliveredAt) <
        new Date()
  ).length
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
        <Link href="/post" className={styles.notificationIcon}>
          <Image src={postIcon} alt="postIcon" />
          {newArrivalCount > 0 && (
            <div className={styles.notificationCount}>{newArrivalCount}</div>
          )}
        </Link>
      </div>

      <div className={styles.tabContainer}>
        <Link
          href="/create/list"
          className={`${styles.tab} ${
            activeTab === 'created' ? styles.activeTab : ''
          }`}
        >
          つくった
        </Link>
        <Link
          href="/receive/list"
          className={`${styles.tab} ${
            activeTab === 'received' ? styles.activeTab : ''
          }`}
        >
          もらった
        </Link>
      </div>
    </>
  )
}

export default Header
