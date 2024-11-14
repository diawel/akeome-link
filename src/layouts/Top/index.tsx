'use client'

import * as styles from './index.css'
import akeomeLInkSmartPhone from './akeome-link-smart-phone.svg'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import LogoPage from './LogoPage'

const Top = () => {
  return (
    <div className={styles.container}>
      <div className={styles.discription}>
        <div>あけおめリンクは</div>
        <div><span className={styles.redText}>SNS</span>で<span className={styles.redText}>年賀状</span>を</div>
        <div>交換できるサービスです</div>
      </div>
      <div className={styles.image}>
        <Image src={akeomeLInkSmartPhone} alt='akeomeLInkSmartPhone' />
      </div>
      <div className={styles.loginButton}>
        <button className={styles.buttonLayout} onClick={() => signIn()}>Googleアカウントで開始する</button>
      </div>
    </div>
  )
}

export default Top