'use client'

import * as styles from './index.css'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import akeomeLinkLogo from './akeome-link-logo-white.svg'
import cloudImage1 from './cloud-1.png'
import cloudImage2 from './cloud-2.png'
import flowerImage1 from './flower-1.png'
import flowerImage2 from './flower-2.png'
import treeImage1 from './tree-1.png'
import treeImage2 from './tree-2.png'
import mtImage1 from './mt-1.png'

const SideInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.discription}>
          <div>
            <span className={styles.largeText}>SNS</span>で
            <span className={styles.largeText}>共有</span>する
            <span className={styles.largeText}>年賀状</span>アプリ
          </div>
        </div>
        <Image src={akeomeLinkLogo} width={429} alt="akeomeLinkLogo" priority />
        <div className={styles.registerButton}>
          <button className={styles.buttonLayout} onClick={() => signIn()}>
            Googleアカウントで新規登録
          </button>
        </div>
        <div className={styles.loginButton}>
          <button className={styles.buttonLayout} onClick={() => signIn()}>
            ログイン
          </button>
        </div>
        <div className={styles.bottomInfo}>
          <Link className={styles.privacy} href="/privacy">
            プライバシーポリシー
          </Link>
          <Link className={styles.terms} href="/terms">
            利用規約
          </Link>
          <div className={styles.copyRight}>
            開発・運営・デザイン えびしゅり
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideInfo
