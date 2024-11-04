import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const screen = style({
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto auto 1fr auto',
  backgroundColor: color.gray[90],
  overflow: 'hidden',
  userSelect: 'none',
})

export const cardWrapper = style({
  padding: 16,
  overflow: 'hidden',
})
