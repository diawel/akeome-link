import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'none',
  '@media': {
    'screen and (min-width: 1024px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      textAlign: 'center',
      position: 'relative',
    },
  },
})

export const flowerImage = style({
  position: 'absolute',
  bottom: 0,
  right: 0,
  transform: 'translate(30%, 30%)',
})
