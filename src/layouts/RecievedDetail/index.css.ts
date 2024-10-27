import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const container = style({
  width: '100%',
  height: '100%',
  position: 'relative',
})

export const screen = style({
  width: '100%',
  height: '100%',
  backgroundColor: color.gray[90],
  overflow: 'auto',
})

export const content = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 56px 56px',
  gap: 36,
})

export const title = style({
  fontSize: 24,
  fontWeight: 'bold',
  color: color.gray[5],
  textAlign: 'center',
})

export const cardContainer = style({
  width: '100%',
  boxShadow: '0 4px 8px rgba(0 0 0 / 5%)',
})

export const control = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 20,
})

const primaryButtonBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  gap: 10,
  textDecoration: 'none',
  backgroundColor: color.red[5],
  color: color.gray[100],
  borderRadius: 12,
  fontWeight: 'bold',
  border: 'none',
  fontSize: 16,
  cursor: 'pointer',
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

export const overlayContainer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'brightness(0.5)',
  padding: 16,
})

export const metaContainer = style({
  padding: 16,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})
