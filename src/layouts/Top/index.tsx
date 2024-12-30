import * as styles from './index.css'
import Image from 'next/image'
import akeomeLinkLogo from '../../assets/akeome-link-logo.svg'
import smartPhoneImage from './smartphone-image.png'
import descriptionImage1 from './image-1.png'
import descriptionImage2 from './image-2.png'
import descriptionImage3 from './image-3.png'
import backgroundImage from './background-image.svg'
import postImage from './post-image.svg'
import LoginButton from '../../components/LoginButton'

const Top = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            src={akeomeLinkLogo}
            className={styles.logoImage}
            alt="あけおめリンク"
            priority
          />
        </div>
        <div className={styles.topContent}>
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
        <div className={styles.mainDescription}>
          <div className={styles.text2024}>2024</div>
          <div className={styles.imageContainer1}>
            <Image
              className={styles.descriptionImage1}
              src={descriptionImage1}
              alt="年画像を作っている画面のスクリーンショット"
            />
            <div className={styles.overlayText1}>
              <span className={styles.overlayText}>
                あなただけの年賀状を
                <br />
                カンタン作成
              </span>
            </div>
          </div>
          <div className={styles.imageContainer2}>
            <Image
              className={styles.descriptionImage2}
              src={descriptionImage2}
              alt="年賀状の完成画面のスクリーンショット"
            />
            <div className={styles.overlayText2}>
              <span className={styles.overlayText}>
                好きなSNSに
                <br />
                リンクを共有するだけで
                <br />
                準備完了
              </span>
            </div>
          </div>
          <div className={styles.imageContainer3}>
            <Image
              className={styles.descriptionImage3}
              src={descriptionImage3}
              alt="年賀状の受け取り画面のスクリーンショット"
            />
            <div className={styles.overlayText3}>
              <span className={styles.overlayText}>
                年が明けたら
                <br />
                受け取りにいこう
              </span>
            </div>
          </div>
          <div className={styles.text2025}>2025</div>
          <div className={styles.akeomeLinkText}>
            <div>あけおめリンクで</div>
            <div className={styles.textSpace}></div>
            <div>年賀状をはじめよう</div>
          </div>
          <div className={styles.startButtonContainer}>
            <LoginButton className={styles.startButtonLayout}>
              Googleアカウントで開始する
            </LoginButton>
          </div>
          <div className={styles.postImageContainer}>
            <Image
              className={styles.postImage}
              src={postImage}
              alt="postImage"
            />
          </div>
        </div>
        <Image
          className={styles.backgroundImage}
          src={backgroundImage}
          alt="backgroundImage"
        />
      </div>
    </div>
  )
}

export default Top
