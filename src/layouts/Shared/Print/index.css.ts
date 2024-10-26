import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

const containerBase = style({
  width: '100%',
  backgroundColor: color.gray[90],
  borderRadius: 12,
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  alignItems: 'center',
})

export const container = styleVariants({
  default: [containerBase],
  loading: [
    containerBase,
    {
      pointerEvents: 'none',
      filter: 'brightness(0.5)',
    },
  ],
})

const seconradyButtonBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  textDecoration: 'none',
  backgroundColor: color.gray[100],
  color: color.gray[5],
  borderRadius: 12,
  fontWeight: 'bold',
  border: 'none',
  fontSize: 16,
  cursor: 'pointer',
})

export const seconradyButton = styleVariants({
  default: [seconradyButtonBase],
  disabled: [
    seconradyButtonBase,
    {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  ],
})

export const markedList = style({
  display: 'flex',
  gap: 4,
})

export const qrCode = style({
  width: 200,
  maxWidth: '100%',
})
