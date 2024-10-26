import { useEffect, useState } from 'react'
import Card from '../../../components/Card'
import * as styles from './index.css'
import { FaImage, FaNoteSticky } from 'react-icons/fa6'
import { useStickers } from '../../../app/StickerProvider'

type EditProps = {
  cardLayout: React.ComponentProps<typeof Card>['layout']
  setCardLayout: (
    cardLayout: React.ComponentProps<typeof Card>['layout']
  ) => void
  isAnyFocused: boolean
  setIsAnyFocused: (isAnyFocused: boolean) => void
  userImages: React.ComponentProps<typeof Card>['userImages']
  setUserImages: (
    userImages: React.ComponentProps<typeof Card>['userImages']
  ) => void
}

const Edit = ({
  cardLayout,
  setCardLayout,
  isAnyFocused,
  setIsAnyFocused,
  userImages,
  setUserImages,
}: EditProps) => {
  const stickers = useStickers()
  const [activeTab, setActiveTab] = useState<'userImage' | 'sticker' | 'text'>(
    'userImage'
  )
  const focusedContent = isAnyFocused
    ? cardLayout[cardLayout.length - 1].content
    : null
  useEffect(() => {
    if (focusedContent)
      setActiveTab(cardLayout[cardLayout.length - 1].content.type)
  }, [cardLayout, focusedContent])

  return (
    <div>
      <div className={styles.controlContainer}>
        {activeTab == 'userImage' ? (
          <div className={styles.control}>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = (event) => {
                  if (typeof event.target?.result !== 'string') return
                  setUserImages([
                    ...userImages,
                    {
                      id: userImages.length + 1,
                      attributes: {
                        url: event.target.result,
                      },
                    },
                  ])
                  setCardLayout(
                    cardLayout.concat({
                      container: { x: 200, y: 291, scale: 1, rotate: 0 },
                      content: {
                        type: 'userImage',
                        id: userImages.length + 1,
                      },
                    })
                  )
                  setIsAnyFocused(true)
                }
                reader.readAsDataURL(file)
              }}
            />
          </div>
        ) : activeTab == 'sticker' ? (
          <div className={styles.control}>
            {stickers.map((sticker) => (
              <button
                key={sticker.id}
                onClick={() => {
                  setCardLayout([
                    ...cardLayout,
                    {
                      container: { x: 200, y: 291, scale: 1, rotate: 0 },
                      content: {
                        type: 'sticker',
                        stickerId: sticker.id,
                      },
                    },
                  ])
                  setIsAnyFocused(true)
                }}
              >
                <img
                  className={styles.sticker}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}${sticker.attributes.image.data.attributes.url}`}
                  alt=""
                />
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.control}>
            <button
              onClick={() => {
                setCardLayout([
                  ...cardLayout,
                  {
                    container: { x: 200, y: 291, scale: 1, rotate: 0 },
                    content: {
                      type: 'text',
                      text: 'テキストを入力',
                      color: '#000',
                      align: 'center',
                    },
                  },
                ])
                setIsAnyFocused(true)
              }}
            >
              追加
            </button>
            {focusedContent?.type === 'text' && (
              <>
                <input
                  type="color"
                  value={focusedContent.color}
                  onChange={(event) => {
                    setCardLayout(
                      cardLayout.slice(0, -1).concat({
                        ...cardLayout[cardLayout.length - 1],
                        content: {
                          ...focusedContent,
                          color: event.target.value,
                        },
                      })
                    )
                  }}
                />
                <button
                  onClick={() => {
                    setCardLayout(
                      cardLayout.slice(0, -1).concat({
                        ...cardLayout[cardLayout.length - 1],
                        content: {
                          ...focusedContent,
                          align:
                            focusedContent.align == 'left'
                              ? 'center'
                              : focusedContent.align == 'center'
                              ? 'right'
                              : 'left',
                        },
                      })
                    )
                  }}
                >
                  {focusedContent.align == 'left'
                    ? '左揃え'
                    : focusedContent.align == 'center'
                    ? '中央揃え'
                    : '右揃え'}
                </button>
                <textarea
                  value={focusedContent.text}
                  onChange={(event) => {
                    setCardLayout(
                      cardLayout.slice(0, -1).concat({
                        ...cardLayout[cardLayout.length - 1],
                        content: {
                          ...focusedContent,
                          text: event.target.value,
                        },
                      })
                    )
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>
      <div className={styles.nav}>
        <button
          className={
            styles.navButton[activeTab == 'userImage' ? 'active' : 'default']
          }
          onClick={() => {
            setActiveTab('userImage')
            if (focusedContent?.type !== 'userImage') {
              setIsAnyFocused(false)
            }
          }}
        >
          <FaImage className={styles.navButtonIcon} />
          写真
        </button>
        <button
          className={
            styles.navButton[activeTab == 'sticker' ? 'active' : 'default']
          }
          onClick={() => {
            setActiveTab('sticker')
            if (focusedContent?.type !== 'sticker') {
              setIsAnyFocused(false)
            }
          }}
        >
          <FaNoteSticky className={styles.navButtonIcon} />
          スタンプ
        </button>
        <button
          className={
            styles.navButton[activeTab == 'text' ? 'active' : 'default']
          }
          onClick={() => {
            setActiveTab('text')
            if (focusedContent?.type !== 'text') {
              setIsAnyFocused(false)
            }
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.42 16.14L1.88 20.26C1.74 20.66 1.44 20.82 1.1 20.82C0.96 20.82 0.84 20.8 0.7 20.76C0.3 20.66 0 20.32 0 19.94C0 19.82 0.0199999 19.72 0.0599999 19.6L5.5 5.94C5.76 5.26 6.26 5 6.88 5C7.52 5 8.04 5.26 8.3 5.94L13.74 19.64C13.8 19.76 13.82 19.86 13.82 19.98C13.82 20.38 13.5 20.68 13.1 20.78C12.98 20.82 12.86 20.84 12.74 20.84C12.38 20.84 12.06 20.66 11.92 20.28L10.34 16.14H3.42ZM4.02 14.46H9.74L7.52 8.64C7.3 8.06 7.08 7.42 6.9 6.74C6.72 7.42 6.52 8.06 6.28 8.66L4.02 14.46Z" />
            <path d="M23.8652 13.6201V12.7601C23.8652 11.4401 23.1452 10.8601 21.5652 10.8601C20.1052 10.8601 19.3852 11.4201 19.0452 12.3401C18.9052 12.7201 18.6052 12.8601 18.2652 12.8601C18.1052 12.8601 17.9452 12.8401 17.8052 12.7801C17.4252 12.6601 17.1452 12.3801 17.1452 12.0201C17.1452 11.9401 17.1652 11.8601 17.1852 11.7801C17.3852 11.1601 17.9052 10.5801 18.3652 10.2201C19.0652 9.68009 19.9652 9.34009 21.5852 9.34009C24.2652 9.34009 25.5852 10.4001 25.5852 12.7601V18.2201C25.5852 18.9201 25.6852 19.6001 25.8052 19.9801C25.8252 20.0401 25.8452 20.1201 25.8452 20.1801C25.8452 20.5001 25.5452 20.7801 25.0452 20.8201C24.9852 20.8201 24.9252 20.8201 24.8652 20.8201C24.4652 20.8201 24.1052 20.7001 24.0252 20.3401C23.9652 20.1001 23.9252 19.7401 23.9052 19.3401C23.1452 20.2001 22.0852 20.9801 20.1052 20.9801C17.9052 20.9801 16.5652 19.7401 16.5652 17.6801C16.5652 15.8001 17.6852 14.6001 19.5852 14.0801C20.6852 13.7801 21.7252 13.6601 23.8652 13.6201ZM23.8652 16.4001V15.0601C21.5252 15.1201 20.4252 15.3201 19.6252 15.7201C18.8252 16.1201 18.4052 16.7401 18.4052 17.7001C18.4052 18.7401 19.2052 19.4401 20.4052 19.4401C21.6652 19.4401 22.7052 18.8201 23.3452 18.0201C23.7252 17.5401 23.8652 17.1601 23.8652 16.4001Z" />
          </svg>
          テキスト
        </button>
      </div>
    </div>
  )
}

export default Edit
