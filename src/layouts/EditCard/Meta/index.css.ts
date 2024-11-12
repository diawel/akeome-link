import { style } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export const control = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  paddingBottom: 0,
})

export const primaryButton = style({
  padding: '10px 24px',
  backgroundColor: color.red[5],
  color: color.gray[100],
  borderRadius: 12,
  textDecoration: 'none',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  minWidth: 120,
})
