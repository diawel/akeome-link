'use client'

import { createContext, useContext } from 'react'
import { StickerAttributes } from '../utils/strapi/sticker'
import { StrapiRecord } from '../utils/strapi'

const StickerContext = createContext<
  StrapiRecord<StickerAttributes>[] | undefined | undefined
>(undefined)

type StickerProviderProps = {
  children: React.ReactNode
  stickers: StrapiRecord<StickerAttributes>[]
}

const StickerProvider = ({ children, stickers }: StickerProviderProps) => {
  return (
    <StickerContext.Provider value={stickers}>
      {children}
    </StickerContext.Provider>
  )
}

export const useStickers = () => {
  const context = useContext(StickerContext)
  if (context === undefined) {
    throw new Error('useStickers must be used within a StickerProvider')
  }
  return context
}

export default StickerProvider
