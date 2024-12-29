import * as styles from './index.css'
import Image from 'next/image'
import akeomeLinkLogo from '../../assets/akeome-link-logo.svg'
import smartPhoneImage from './smartphone-image.svg'
import LoginButton from '../../components/LoginButton'

const Top = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoImage}>
          <Image
            src={akeomeLinkLogo}
            width={255}
            alt="akeomeLinkLogo"
            priority
          />
        </div>
        <div className={styles.mainDiscription}>
          <Image
            className={styles.smartPhoneImage}
            src={smartPhoneImage}
            alt="smartPhoneImage"
            priority
          />
          <div className={styles.redContainer}>
            <div className={styles.discriptionText}>
              大切な人とも、
              <br />
              疎遠な人とも、
              <br />
              年賀状を交換しよう
            </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top
