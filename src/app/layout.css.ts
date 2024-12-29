import { style } from '@vanilla-extract/css'
import * as disabledScrollStyle from '../components/DisableScroll/index.css'
import { color } from '../../src/utils/styleSchema'

export const body = style({
  display: 'flex',
  height: '100dvh',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#eeeeee',
  overflow: 'hidden',
})

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  width: '100%',

  '@media': {
    'screen and (min-width: 992px)': {
      flexDirection: 'row',
      backgroundColor: color.red[5],
    },
  },
})

export const sideInfo = style({
  display: 'none',
  width: 738,

  '@media': {
    'screen and (min-width: 992px)': {
      display: 'block',
    },
  },
})

export const display = style({
  backgroundColor: '#ffffff',
  width: '100%',
  height: '100%',
  boxSizing: 'content-box',
  marginTop: 38,

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
  overscrollBehaviorY: 'none',

  selectors: {
    [`&:has(${disabledScrollStyle.fixedScreen})`]: {
      overflowY: 'hidden',
    },
  },
})
