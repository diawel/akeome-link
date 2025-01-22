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
          <div className={styles.qrCodeContainer}>
            <img
              src={response.base64QrCode}
              className={styles.qrCode}
              alt="印刷用QRコード"
            />
            ユーザーコード：{response.userCode}
          </div>
          <div>
            <ul>
              <li>期限は8日間です</li>
              <li>一度閉じると再表示できません</li>
            </ul>
          </div>
          <button className={styles.secondaryButton} onClick={onClose}>
            閉じる
          </button>
        </>
      ) : (
        <>
          <dl className={styles.markedList}>
            <dt>
              <label
                className={styles.checkBox[isChecked ? 'checked' : 'default']}
              >
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.check}
                >
                  <path
                    d="M1 6L5 9.5L13 1"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className={styles.input}
                />
              </label>
            </dt>
            <dd>
              <Link
                href="https://networkprint.ne.jp/Lite/terms.html"
                className={styles.linkText}
                target="_blank"
              >
                ネットワークプリントサービス利用規約
              </Link>
              と
              <Link
                href="https://smj.jp.sharp/bs/contact/networkprint/"
                className={styles.linkText}
                target="_blank"
              >
                ネットワークプリント個人情報取り扱いについて
              </Link>
              に同意する
            </dd>
          </dl>
          <div className={styles.buttonsContainer}>
            <button
              className={
                styles.primaryButton[isChecked ? 'default' : 'disabled']
              }
              disabled={!isChecked}
              onClick={() => {
                setIsUploading(true)
                const formData = new FormData()
                formData.append(
                  'file',
                  new File(
                    [image],
                    image.type === 'image/png' ? 'image.png' : 'image.jpg'
                  )
                )
                formData.append('userAgent', navigator.userAgent)
                reservePrint(formData).then((response) => {
                  setResponse(response)
                  setIsUploading(false)
                })
              }}
            >
              印刷予約をする
            </button>
            <button className={styles.secondaryButton} onClick={onClose}>
              キャンセル
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Print
