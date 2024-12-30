'use client'

import * as styles from './index.css'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import akeomeLinkLogo from './akeome-link-logo-white.svg'
import cloudImage from './cloud.svg'
import flowerImage from '../flower.svg'
import treeAndCloud from './treeAndCloud.svg'
import treeAndMt from './treeAndMt.svg'

type LeftProps = {
  isSignedIn: boolean
}

const Left = ({ isSignedIn }: LeftProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.cloudImage}>
        <Image src={cloudImage} alt="" loading="eager" />
      </div>
      <div className={styles.flowerImage}>
        <Image src={flowerImage} alt="" loading="eager" />
      </div>
      <div className={styles.treeAndCloud}>
        <Image src={treeAndCloud} alt="" loading="eager" />
      </div>
      <div className={styles.treeAndMt}>
        <Image src={treeAndMt} alt="" loading="eager" />
      </div>
      <div className={styles.column}>
        <div className={styles.content}>
          <div className={styles.discription}>
            <div>
              <span className={styles.largeText}>SNS</span>で
              <span className={styles.largeText}>共有</span>する
              <span className={styles.largeText}>年賀状</span>アプリ
            </div>
          </div>
          <Image
            src={akeomeLinkLogo}
            width={429}
            alt="あけおめリンク"
            loading="eager"
          />
          {!isSignedIn && (
            <>
              <div className={styles.registerButton}>
                <button
                  className={styles.buttonLayout}
                  onClick={() => signIn()}
                >
                  Googleアカウントで新規登録
                </button>
              </div>
              <div className={styles.loginButton}>
                <button
                  className={styles.buttonLayout}
                  onClick={() => signIn()}
                >
                  ログイン
                </button>
              </div>
            </>
          )}
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

export default Left
