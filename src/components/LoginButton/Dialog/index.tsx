'use client'

import * as styles from './index.css'

type DialogProps = {
  onClose: () => void
}

const Dialog = ({ onClose }: DialogProps) => {
  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <span>
          アプリ内ブラウザではご利用いただけません。
          <br />
          SafariやChromeなどの外部ブラウザをご利用ください。
        </span>
        <button className={styles.button} onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  )
}

export default Dialog
