import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const list = style({
  paddingBlock: 12,
})

export const listItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 40px',
  minHeight: 72,
  gap: 24,
  textDecoration: 'none',
  borderBottom: `1px solid ${color.gray[80]}`,
})

export const titleBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const title = style({
  fontSize: 16,
  fontWeight: 'bold',
  color: color.gray[5],
})

export const deliveryDate = style({
  fontSize: 12,
  fontWeight: 'bold',
  color: color.red[5],
})
