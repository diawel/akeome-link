import { useEffect, useRef } from 'react'
import * as styles from './index.css'

type ListLoaderProps = {
  loadMore: () => Promise<void>
  offset?: number
}

const ListLoader = ({ loadMore, offset }: ListLoaderProps) => {
  const markerRef = useRef<HTMLDivElement>(null)
  const isLoadingRef = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        if (isLoadingRef.current) return
        isLoadingRef.current = true
        await loadMore()
        isLoadingRef.current = false
      }
    })
    if (markerRef.current) {
      observer.observe(markerRef.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [loadMore])
  return (
    <div
      ref={markerRef}
      style={{
        top: -(offset ?? 0),
      }}
      className={styles.marker}
    />
  )
}

export default ListLoader
