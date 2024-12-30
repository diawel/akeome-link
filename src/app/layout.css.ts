import { style } from '@vanilla-extract/css'
import * as disabledScrollStyle from '../components/DisableScroll/index.css'
import { color } from '../../src/utils/styleSchema'

export const body = style({
  height: '100dvh',
  width: '100%',
  overflow: 'hidden',
})

export const container = style({
  display: 'contents',

  '@media': {
    'screen and (min-width: 480px)': {
      width: '100%',
      height: '100%',
      contain: 'paint',
      display: 'grid',
      gridTemplateColumns: '1fr 480px 1fr',
      backgroundColor: color.gray[100],
      gridTemplateRows: '100%',
    },
    'screen and (min-width: 1024px)': {
      gridTemplateColumns: '11fr 395px 2fr',
      gridTemplateRows: '100%',
      backgroundBlendMode: 'overlay',
      background:
        'linear-gradient(rgba(228, 0, 0, 1), rgba(228, 0, 0, 1)), ' +
        `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' style='opacity: 0.15; filter: invert(100%25) grayscale(100%25) contrast(200%25) brightness(300%25);' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    },
  },
})

export const sideInfo = style({
  display: 'none',

  '@media': {
    'screen and (min-width: 480px)': {
      display: 'block',
    },
  },
})

export const display = style({
  width: '100%',
  height: '100%',
  margin: 0,

  '@media': {
    'screen and (min-width: 1024px)': {
      paddingTop: 38,
    },
  },
})

export const inner = style({
  position: 'relative',
  height: '100%',

  '@media': {
    'screen and (min-width: 1024px)': {
      borderRadius: '32px 32px 0 0',
      overflow: 'hidden',
      boxShadow: '0 0 32px rgba(0, 0, 0, 0.1)',
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
