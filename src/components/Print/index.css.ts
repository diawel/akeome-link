import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

const containerBase = style({
  width: '100%',
  backgroundColor: color.gray[90],
  borderRadius: 12,
  padding: 30,
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
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

export const linkText = style({
  color: color.red[5],
})

const checkBoxBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 20,
  height: 20,
  borderRadius: 3,
  marginBlock: 3,
})

export const checkBox = styleVariants({
  default: [
    checkBoxBase,
    {
      border: `1px solid ${color.gray[40]}`,
      backgroundColor: color.gray[100],
    },
  ],
  checked: [
    checkBoxBase,
    {
      backgroundColor: color.red[5],
    },
  ],
})

export const check = style({
  selectors: {
    [`${checkBox.default} &`]: {
      display: 'none',
    },
  },
})

export const input = style({
  display: 'none',
})

export const buttonsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
})

export const seconradyButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 24px',
  textDecoration: 'none',
  backgroundColor: color.gray[100],
  color: color.gray[5],
  borderRadius: 12,
  fontWeight: 'bold',
  border: 'none',
  fontSize: 16,
  cursor: 'pointer',
})

export const primaryButtonBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 24px',
  textDecoration: 'none',
  backgroundColor: color.red[5],
  color: color.gray[100],
  borderRadius: 12,
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
  fontSize: 16,
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

export const markedList = style({
  display: 'flex',
  gap: 12,
})

export const qrCodeContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: color.gray[100],
  borderRadius: 4,
  padding: '8px 20px 20px',
  fontSize: 14,
  fontWeight: 'bold',
})

export const qrCode = style({
  width: '100%',
  marginBottom: '-3%',
})
