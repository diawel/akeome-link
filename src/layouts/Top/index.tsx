'use client'

import * as styles from './index.css'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import akeomeLinkLogo from '../../assets/akeome-link-logo.svg'

const Top = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image src={akeomeLinkLogo} width={255} alt='akeomeLinkLogo' />
        <div className={styles.discription}>
          <div><span className={styles.redText}>SNS</span>で<span className={styles.redText}>年賀状</span>を交換</div>
        </div>
        <div className={styles.loginButton}>
          <button className={styles.buttonLayout} onClick={() => signIn()}>Googleアカウントで開始する</button>
        </div>
        <div className={styles.linkText}>
          <Link className={styles.privacy} href='/privacy'>プライバシーポリシー</Link>
          <Link className={styles.terms} href='/terms'>利用規約</Link>
        </div>
      </div>
    </div>
  )
}

export default Top