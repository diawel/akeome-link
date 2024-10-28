'use client'

import { useEffect, useRef, useState } from 'react'
import Card, { CardLayout } from '..'
import { ImageUrlSet } from '../../../utils/strapi/strapiImage'
import * as styles from './index.css'
import * as catdStyles from '../index.css'
import html2canvas from 'html2canvas'

type RendererProps = {
  layout: CardLayout
  userImages: {
    id: number
    urlSet: ImageUrlSet
  }[]
  onRender: (image: Blob) => void
  randomSeed?: number
}

const Renderer = ({
  layout,
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
          `.${catdStyles.userImageContainer} .${catdStyles.sticker}`
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
                canvas.toBlob((blob) => {
                  if (blob) onRender(blob)
                })
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
          userImages={userImages}
          randomVariants="revealed"
          proxy
          randomSeed={randomSeed}
        />
      </div>
    </>
  )
}

export default Renderer
