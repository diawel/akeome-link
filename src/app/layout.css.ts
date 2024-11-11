import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  height: '100dvh',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#eeeeee',
  overflow: 'hidden',
})

export const display = style({
  backgroundColor: '#ffffff',
  width: '100%',
  height: '100%',
  boxSizing: 'content-box',

  '@media': {
    'screen and (min-width: 480px)': {
      width: '395px',
      padding: '48px 8px',
      borderRadius: '36px',
      maxHeight: '760px',
    },
  },
})

export const inner = style({
  height: '100%',
  overflowY: 'auto',
  backgroundColor: '#f5f5f5',

  '@media': {
    'screen and (min-width: 480px)': {
      border: '1px solid #eeeeee',
    },
  },
})
