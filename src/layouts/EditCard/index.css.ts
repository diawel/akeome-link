import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const screen = style({
  width: '100%',
  height: '100%',
  position: 'relative',
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

export const settingContainer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: color.gray[100],
})
