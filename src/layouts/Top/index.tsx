import * as styles from './index.css'
import Image from 'next/image'
import Link from 'next/link'
import akeomeLinkLogo from '../../assets/akeome-link-logo.svg'
import LoginButton from '../../components/LoginButton'

const Top = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image src={akeomeLinkLogo} width={255} alt="akeomeLinkLogo" priority />
        <div className={styles.discription}>
          <div>
            <span className={styles.redText}>SNS</span>で
            <span className={styles.redText}>年賀状</span>を交換
          </div>
        </div>
        <div className={styles.loginButton}>
          <LoginButton className={styles.buttonLayout}>
            Googleアカウントで開始する
          </LoginButton>
        </div>
        <div className={styles.linkText}>
          <Link className={styles.privacy} href="/privacy">
            プライバシーポリシー
          </Link>
          <Link className={styles.terms} href="/terms">
            利用規約
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Top
