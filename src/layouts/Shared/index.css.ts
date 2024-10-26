import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const screen = style({
  width: '100%',
  height: '100%',
  backgroundColor: color.gray[90],
  overflow: 'auto',
})

export const content = style({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '36px 56px',
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

export const primaryButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  gridColumn: '1 / span 2',
  textDecoration: 'none',
  backgroundColor: color.red[5],
  color: color.gray[100],
  borderRadius: 12,
  fontWeight: 'bold',
})

const seconradyButtonBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  gap: 10,
  textDecoration: 'none',
  backgroundColor: color.gray[100],
  color: color.gray[5],
  borderRadius: 12,
  fontWeight: 'bold',
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
