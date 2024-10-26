import { style } from '@vanilla-extract/css'

export const postContainer = style({
  position: 'relative',
  width: '100%',
  height: 'auto',
})

export const post = style({
  width: '100%',
})

export const card = style({
  position: 'absolute',
  marginTop: '180px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  width: '282px',
  padding: '16px',
})
