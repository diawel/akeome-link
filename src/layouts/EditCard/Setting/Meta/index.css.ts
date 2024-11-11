import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../../../utils/styleSchema'

export const control = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
})

export const returnButtonContainer = style({
  padding: 4,
})

export const returnButton = style({
  color: color.gray[5],
})

const primaryButtonBase = style({
  padding: '10px 24px',
  backgroundColor: color.red[5],
  color: color.gray[100],
  borderRadius: 12,
  cursor: 'pointer',
  border: 'none',
  fontSize: 16,
  fontWeight: 'bold',
  minWidth: 120,
})

export const primaryButton = styleVariants({
  default: [primaryButtonBase],
  disabled: [
    primaryButtonBase,
    {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  ],
})
