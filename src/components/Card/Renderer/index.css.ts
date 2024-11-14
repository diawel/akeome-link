import { style } from '@vanilla-extract/css'

export const container = style({
  position: 'absolute',
  overflow: 'hidden',
})

export const renderer = style({
  position: 'absolute',
  pointerEvents: 'none',
  width: 600,
})
