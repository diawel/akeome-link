'use client'

import { useEffect, useRef } from 'react'
import Card, { CardLayout } from '..'
import { ImageUrlSet } from '../../../utils/strapiImage'
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
}

const Renderer = ({ layout, userImages, onRender }: RendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  useEffect(() => {
    const checkLoadingProgress = () => {
      if (containerRef.current) {
        const images = containerRef.current?.querySelectorAll(
          `.${catdStyles.userImageContainer} .${catdStyles.sticker}`
        )
        const allCompleted =
          !images ||
          images?.entries().every(([, image]) => {
            if (!(image instanceof HTMLImageElement)) return true
            return image.complete
          })
        if (allCompleted) {
          const card = containerRef.current?.querySelector<HTMLDivElement>(
            `.${catdStyles.card}`
          )
          if (card?.getBoundingClientRect().width) {
            html2canvas(containerRef.current).then(
              (canvas: HTMLCanvasElement) => {
                canvas.toBlob((blob) => {
                  if (blob) onRender(blob)
                })
              }
            )
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
  }, [onRender])
  return (
    <>
      <div ref={containerRef} className={styles.container}>
        <Card layout={layout} userImages={userImages} proxy />
      </div>
    </>
  )
}

export default Renderer
