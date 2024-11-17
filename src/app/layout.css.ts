import { style } from '@vanilla-extract/css'
import * as disabledScrollStyle from '../components/DisableScroll/index.css'

export const html = style({
  overscrollBehaviorY: 'none',
})

export const body = style({
  display: 'flex',
  height: '100dvh',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#eeeeee',
  overflow: 'hidden',
  overscrollBehaviorY: 'none',
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
  position: 'relative',
  height: '100%',

  '@media': {
    'screen and (min-width: 480px)': {
      border: '1px solid #eeeeee',
    },
  },
})

export const content = style({
  height: '100%',
  overflowY: 'auto',
  backgroundColor: '#f5f5f5',
  contain: 'paint',

  selectors: {
    [`&:has(${disabledScrollStyle.fixedScreen})`]: {
      overflowY: 'hidden',
    },
  },
})
