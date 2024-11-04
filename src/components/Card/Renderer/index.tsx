'use client'

import { useEffect, useRef, useState } from 'react'
import Card, { CardBackground, CardLayout } from '..'
import { ImageUrlSet } from '../../../utils/strapi/strapiImage'
import * as styles from './index.css'
import * as catdStyles from '../index.css'
import html2canvas from 'html2canvas'

type RendererProps = {
  layout: CardLayout
  background: CardBackground
  userImages: {
    id: number
    urlSet: ImageUrlSet
  }[]
  onRender: (image: Blob) => void
  randomSeed?: number
}

const Renderer = ({
  layout,
  background,
  userImages,
  onRender,
  randomSeed,
}: RendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [isRendered, setIsRendered] = useState(false)
  useEffect(() => {
    if (isRendered) return
    const checkLoadingProgress = () => {
      if (containerRef.current) {
        const images = containerRef.current?.querySelectorAll(
          `.${catdStyles.card} .${catdStyles.backgroundContainer} > img, .${catdStyles.card} .${catdStyles.userImageContainer} > img, .${catdStyles.card} .${catdStyles.stickerContainer} > img`
        )
        const allCompleted =
          !images ||
          !images.length ||
          images?.entries().every?.(([, image]) => {
            if (!(image instanceof HTMLImageElement)) return true
            return image.complete
          })
        if (allCompleted) {
          const card = containerRef.current?.querySelector<HTMLDivElement>(
            `.${catdStyles.card}`
          )
          if (card?.getBoundingClientRect().width) {
            // 画面内のnext/imageは全てloading=eagerにしないとハングする
            html2canvas(containerRef.current, {}).then(
              (canvas: HTMLCanvasElement) => {
                const toBlob = (quality?: number) => {
                  canvas.toBlob(
                    (blob) => {
                      if (!blob) return
                      if (blob.size < 4718592) onRender(blob)
                      else toBlob(quality === undefined ? 1 : quality - 0.1)
                    },
                    quality === undefined ? 'image/png' : 'image/jpeg',
                    quality
                  )
                }
                toBlob()
              }
            )
            setIsRendered(true)
            return
          }
        }
      }
      animationFrameRef.current = requestAnimationFrame(checkLoadingProgress)
    }
    checkLoadingProgress()

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isRendered, onRender])
  return (
    <>
      <div ref={containerRef} className={styles.container}>
        <Card
          layout={layout}
          background={background}
          userImages={userImages}
          maxFormat="original"
          randomVariants={randomSeed !== undefined ? 'revealed' : 'hidden'}
          randomSeed={randomSeed}
          proxy
        />
      </div>
    </>
  )
}

export default Renderer
