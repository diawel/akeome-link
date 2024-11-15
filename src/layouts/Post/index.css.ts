import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const container = style({
  width: '100%',
  height: '100%',
  position: 'relative',
})

export const screen = style({
  width: '100%',
  height: '100%',
  backgroundColor: color.gray[100],
  overflow: 'auto',
})
