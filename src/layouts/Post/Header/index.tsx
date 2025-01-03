import React from 'react'
import * as styles from './index.css'
import Link from 'next/link'
import ReturnButton from '../../../components/ReturnButton'
import { color } from '../../../utils/styleSchema'

type HeaderProps = {
  activeTab: 'delivered' | 'undelivered'
}

const Header = async ({ activeTab }: HeaderProps) => {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.returnButtonContainer}>
          <ReturnButton href="/receive/list" color={color.gray[100]} />
        </div>
        <div className={styles.title}>ポスト</div>
      </div>

      <div className={styles.tabContainer}>
        <Link
          href="/post/delivered"
          className={`${styles.tab} ${
            activeTab === 'delivered' ? styles.activeTab : ''
          }`}
        >
          届いた年賀状
        </Link>
        <Link
          href="/post/undelivered"
          className={`${styles.tab} ${
            activeTab === 'undelivered' ? styles.activeTab : ''
          }`}
        >
          配達待ち
        </Link>
      </div>
    </>
  )
}

export default Header
