import { useEffect, useState } from 'react'
import Card, { CardBackground } from '../../../components/Card'
import * as styles from './index.css'
import { useStickers } from '../../../app/StickerProvider'
import { uploadMedia } from '../../../utils/strapi/media'
import { getImageUrl } from '../../../utils/strapi/strapiImage'
import randomLabel from './random-label.svg'
import Image from 'next/image'

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
  setCardBackground: (background: CardBackground) => void
  setIsLoading: (isLoading: boolean) => void
}

const Edit = ({
  cardLayout,
  setCardLayout,
  isAnyFocused,
  setIsAnyFocused,
  userImages,
  setUserImages,
  setCardBackground,
  setIsLoading,
}: EditProps) => {
  const stickers = useStickers()
  const [activeTab, setActiveTab] = useState<
    'background' | 'userImage' | 'sticker' | 'text'
  >('background')
  const focusedContent = isAnyFocused
    ? cardLayout[cardLayout.length - 1].content
    : null
  useEffect(() => {
    if (focusedContent) {
      setActiveTab(focusedContent.type)
    }
  }, [activeTab, cardLayout, focusedContent])

  return (
    <>
      <div className={styles.controlContainer}>
        {activeTab == 'background' ? (
          <div className={styles.control}>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                setIsLoading(true)
                const file = event.target.files?.[0]
                if (!file) return
                const formData = new FormData()
                formData.append('files', file)
                uploadMedia(formData)
                  .then((media) => {
                    setUserImages(
                      userImages.concat({
                        id: media[0].id,
                        urlSet: media[0],
                      })
                    )
                    setCardBackground({
                      type: 'userImage',
                      id: media[0].id,
                    })
                    setIsLoading(false)
                  })
                  .catch(() => {
                    alert(
                      `画像のアップロードに失敗しました。画像サイズの上限は${process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE_TEXT}です。`
                    )
                    setIsLoading(false)
                  })
              }}
            />
            <input
              type="color"
              onChange={(event) =>
                setCardBackground({ type: 'solid', color: event.target.value })
              }
            />
          </div>
        ) : activeTab == 'userImage' ? (
          <div className={styles.control}>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                setIsLoading(true)
                const file = event.target.files?.[0]
                if (!file) return
                const formData = new FormData()
                formData.append('files', file)
                uploadMedia(formData)
                  .then((media) => {
                    setUserImages(
                      userImages.concat({
                        id: media[0].id,
                        urlSet: media[0],
                      })
                    )
                    setCardLayout(
                      cardLayout.concat({
                        container: { x: 200, y: 291, scale: 1, rotate: 0 },
                        content: {
                          type: 'userImage',
                          id: media[0].id,
                        },
                      })
                    )
                    setIsAnyFocused(true)
                    setIsLoading(false)
                  })
                  .catch(() => {
                    alert(
                      `画像のアップロードに失敗しました。画像サイズの上限は${process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE_TEXT}です。`
                    )
                    setIsLoading(false)
                  })
              }}
            />
          </div>
        ) : activeTab == 'sticker' ? (
          <div className={styles.control}>
            {stickers.map((sticker) => (
              <button
                key={sticker.id}
                className={styles.stickerButton}
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
                  src={getImageUrl(
                    sticker.attributes.image.data.attributes,
                    'thumbnail'
                  )}
                  alt=""
                />
                {sticker.attributes.randomVariants.data?.length && (
                  <Image
                    className={styles.stickerLabel}
                    src={randomLabel}
                    alt="おみくじ対応"
                  />
                )}
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
            styles.navButton[activeTab == 'background' ? 'active' : 'default']
          }
          onClick={() => {
            setActiveTab('background')
            setIsAnyFocused(false)
          }}
        >
          背景
        </button>
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
          ステッカー
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
          テキスト
        </button>
      </div>
    </>
  )
}

export default Edit
