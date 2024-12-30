'use client'

import * as styles from './index.css'
import Image from 'next/image'
import Link from 'next/link'
import akeomeLinkLogo from './akeome-link-logo-white.svg'
import cloudImage from './cloud.svg'
import flowerImage from '../flower.svg'
import treeAndCloud from './treeAndCloud.svg'
import treeAndMt from './treeAndMt.svg'
import LoginButton from '../../../components/LoginButton'

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
                <LoginButton className={styles.buttonLayout}>
                  Googleアカウントで新規登録
                </LoginButton>
              </div>
              <div className={styles.loginButton}>
                <LoginButton className={styles.buttonLayout}>
                  ログイン
                </LoginButton>
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
          <dl className={styles.copyRight}>
            <dt>開発・運営・デザイン</dt>
            <dd>えびとシュリンプ</dd>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Left
