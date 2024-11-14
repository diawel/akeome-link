import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const container = style({
  width: '100%',
  height: '100%',
  position: 'relative',
})

export const screen = style({
  width: '100%',
  height: '100%',
  backgroundColor: color.gray[90],
  overflow: 'auto',
})

export const content = style({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 56,
  gap: 36,
})

export const title = style({
  fontSize: 24,
  fontWeight: 'bold',
  color: color.gray[5],
  textAlign: 'center',
})

export const cardStage = style({
  perspective: 800,
  width: '100%',
})

export const reveal = keyframes({
  '0%': {
    transform: 'rotateY(180deg) scale(1)',
  },
  '25%': {
    transform: 'rotateY(180deg) scale(1.1)',
  },
  '75%': {
    transform: 'rotateY(0deg) scale(1.1)',
  },
  '100%': {
    transform: 'rotateY(0deg) scale(1)',
  },
})

const cardContainerBase = style({
  width: '100%',
  boxShadow: '0 4px 8px rgba(0 0 0 / 5%)',
  position: 'relative',
  animation: `${reveal} 1s forwards`,
  backfaceVisibility: 'hidden',
  transformStyle: 'preserve-3d',
})

export const cardContainer = styleVariants({
  default: [
    cardContainerBase,
    {
      animationPlayState: 'paused',
    },
  ],
  received: [
    cardContainerBase,
    {
      animationPlayState: 'running',
    },
  ],
})

export const emptyCard = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  objectFit: 'cover',
  transform: 'translateZ(-1px) rotateY(180deg)',
})

export const control = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 20,
})

export const primaryButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  gridColumn: '1 / span 2',
  textDecoration: 'none',
  backgroundColor: color.red[5],
  color: color.gray[100],
  borderRadius: 12,
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
  fontSize: 16,
})

const seconradyButtonBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  gap: 10,
  textDecoration: 'none',
  backgroundColor: color.gray[100],
  color: color.gray[5],
  borderRadius: 12,
  fontWeight: 'bold',
  border: 'none',
  fontSize: 16,
  cursor: 'pointer',
})

export const seconradyButton = styleVariants({
  default: [seconradyButtonBase],
  disabled: [
    seconradyButtonBase,
    {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  ],
})

export const overlayContainer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'brightness(0.5)',
  padding: 16,
})
