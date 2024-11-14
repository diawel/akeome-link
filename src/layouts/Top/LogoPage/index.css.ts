import { style } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  backgroundColor: color.red[5],
  textAlign: 'center',
})

export const image = style({
  maxWidth: '100%',
  height: 'auto',
})
  