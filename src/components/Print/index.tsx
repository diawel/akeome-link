import { useState } from 'react'
import * as styles from './index.css'
import Link from 'next/link'
import { reservePrint } from '../../utils/print'

type PrintProps = {
  image: Blob
  onClose: () => void
}

const Print = ({ image, onClose }: PrintProps) => {
  const [isChecked, setIsChecked] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [response, setResponse] = useState<{
    base64QrCode: string
    userCode: string
  } | null>(null)
  return (
    <div className={styles.container[isUploading ? 'loading' : 'default']}>
      {response ? (
        <>
          <img
            src={response.base64QrCode}
            className={styles.qrCode}
            alt="印刷用QRコード"
          />
          <dl className={styles.markedList}>
            <dt>ユーザーコード:</dt>
            <dd>{response.userCode}</dd>
          </dl>
          <div>
            <dl className={styles.markedList}>
              <dt>※</dt>
              <dd>期限は8日間です</dd>
            </dl>
            <dl className={styles.markedList}>
              <dt>※</dt>
              <dd>一度閉じると再表示できません</dd>
            </dl>
          </div>
          <button className={styles.seconradyButton.default} onClick={onClose}>
            閉じる
          </button>
        </>
      ) : (
        <>
          <dl className={styles.markedList}>
            <dt>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
            </dt>
            <dd>
              <Link href="https://networkprint.ne.jp/Lite/terms.html">
                ネットワークプリントサービス利用規約
              </Link>
              と
              <Link href="https://smj.jp.sharp/bs/contact/networkprint/">
                ネットワークプリント個人情報取り扱いについて
              </Link>
              に同意する
            </dd>
          </dl>
          <button
            className={
              styles.seconradyButton[isChecked ? 'default' : 'disabled']
            }
            disabled={!isChecked}
            onClick={() => {
              setIsUploading(true)
              const formData = new FormData()
              formData.append('file', new File([image], 'image.png'))
              formData.append('userAgent', navigator.userAgent)
              reservePrint(formData).then((response) => {
                setResponse(response)
                setIsUploading(false)
              })
            }}
          >
            印刷予約をする
          </button>
          <button className={styles.seconradyButton.default} onClick={onClose}>
            キャンセル
          </button>
        </>
      )}
    </div>
  )
}

export default Print
