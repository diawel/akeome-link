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
  position: 'relative',
})

export const sticker = style({
  width: 'auto',
  height: '100%',
  filter: 'drop-shadow(0 2px 1px rgba(0, 0, 0, 0.25))',
})

export const stickerLabel = style({
  position: 'absolute',
  top: 0,
  right: 0,
})

export const nav = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  paddingInline: 10,
  borderTop: `1px solid ${color.gray[90]}`,
  backgroundColor: color.gray[100],
})

const navButtonBase = style({
  padding: '16px 4px max(env(safe-area-inset-bottom), 16px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  fontSize: 14,
  gap: 2,
  marginTop: -1,
  backgroundColor: 'transparent',
  borderTop: `2px solid`,
  fontWeight: 'bold',
})

export const navButton = styleVariants({
  default: [
    navButtonBase,
    {
      color: color.gray[5],
      borderColor: 'transparent',
    },
  ],
  active: [
    navButtonBase,
    {
      color: color.red[5],
      borderColor: color.red[5],
    },
  ],
})

export const navButtonIcon = style({
  fontSize: 24,
})
