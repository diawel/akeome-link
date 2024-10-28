import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export const controlContainer = style({
  height: 108,
  width: '100%',
  overflow: 'auto',
  backgroundColor: color.gray[100],
})

export const control = style({
  display: 'flex',
  gap: 16,
  padding: 16,
  alignItems: 'center',
  width: 'fit-content',
  height: '100%',
})

export const stickerButton = style({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  backgroundColor: 'transparent',
})

export const sticker = style({
  width: 'auto',
  height: '100%',
})

export const nav = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
})

const navButtonBase = style({
  padding: '16px 16px max(env(safe-area-inset-bottom), 16px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  fontSize: 10,
  gap: 2,
})

export const navButton = styleVariants({
  default: [
    navButtonBase,
    {
      backgroundColor: color.gray[80],
      color: color.gray[5],
      fill: color.gray[5],
    },
  ],
  active: [
    navButtonBase,
    {
      backgroundColor: color.red[5],
      color: color.gray[100],
      fill: color.gray[100],
    },
  ],
})

export const navButtonIcon = style({
  fontSize: 24,
})
