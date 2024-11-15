import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

const containerBase = style({
  width: '100%',
  height: '100%',
  position: 'relative',
})

export const container = styleVariants({
  default: [containerBase],
  newArrival: [containerBase],
})

export const backgroundContainer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: '8fr 1fr',
  overflow: 'hidden',
})

export const patternContainer = style({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: color.red[5],
})

const growIn = keyframes({
  '0%': {
    clipPath: 'circle(20% at 50% 100%)',
    opacity: 0,
  },
  '80%': {
    clipPath: 'circle(140% at 50% 100%)',
    opacity: 0.8,
  },
  '100%': {
    clipPath: 'circle(140% at 50% 100%)',
    opacity: 1,
  },
})

export const patterm = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  animation: `${growIn} 0.6s 1s both`,
})

export const bottomPatternContainer = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
})

export const bottomPattern = style({
  minHeight: '100%',
})

export const overlayContainer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  pointerEvents: 'none',
  overflow: 'hidden',
  transition: 'opacity 0.3s',

  selectors: {
    [`${container.newArrival} &`]: {
      opacity: 1,
    },
  },
})

const slideInFromRight = keyframes({
  '0%': {
    transform: 'translateX(12px)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateX(0)',
    opacity: 1,
  },
})

export const cloudTop = style({
  position: 'absolute',
  top: -20,
  right: -140,
  animation: `${slideInFromRight} 1s 1.2s ease-out backwards`,
})

const slideInFromLeft = keyframes({
  '0%': {
    transform: 'translateX(-12px)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateX(0)',
    opacity: 1,
  },
})

export const cloudBottom = style({
  position: 'absolute',
  top: 20,
  left: -220,
  animation: `${slideInFromLeft} 1s 1s ease-out backwards`,
})

const scaleIn = keyframes({
  '0%': {
    transform: 'scale(1.2)',
    opacity: 0,
  },
  '100%': {
    transform: 'scale(1)',
    opacity: 1,
  },
})

export const daruma = style({
  position: 'absolute',
  bottom: -10,
  left: -20,
  animation: `${scaleIn} 0.3s 1.2s ease-out backwards`,
})

export const fuji = style({
  position: 'absolute',
  bottom: -10,
  right: -10,
  animation: `${scaleIn} 0.3s 1.2s ease-out backwards`,
})

export const hana = style({
  position: 'absolute',
  bottom: -10,
  left: 20,
  animation: `${scaleIn} 0.3s 1.3s ease-out backwards`,
})

export const matsu = style({
  position: 'absolute',
  bottom: -20,
  right: 25,
  animation: `${scaleIn} 0.3s 1.4s ease-out backwards`,
})

const sway = keyframes({
  '0%': {
    transform: 'translateX(0)',
  },
  '50%': {
    transform: 'translateX(8px)',
  },
  '100%': {
    transform: 'translateX(0)',
  },
})

export const cloud = style({
  animation: `${sway} 6s infinite`,
})

export const screen = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: color.gray[90],
  paddingTop: 0, // padding-blockはSafariでトランジションが効かない
  paddingBottom: 0,
  transition:
    'background-color 0.3s 1s, padding-top 0.6s 0.6s, padding-bottom 0.6s 0.6s',

  selectors: {
    [`${container.newArrival} &`]: {
      backgroundColor: `${color.gray[90]}00`,
      paddingTop: 24,
      paddingBottom: 24,
    },
  },
})

const contentBase = style({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 56,
  gap: 36,
})

export const content = styleVariants({
  delivered: [contentBase],
  undelivered: [
    contentBase,
    {
      justifyContent: 'space-between',
    },
  ],
})

export const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
})

export const title = style({
  fontSize: 24,
  fontWeight: 'bold',
  color: color.gray[5],
  textAlign: 'center',
  marginInline: -40,
  transition: 'color 0.3s 1s',

  selectors: {
    [`${container.newArrival} &`]: {
      color: color.gray[100],
      animation: `${fadeIn} 0.3s 2.1s backwards`,
    },
  },
})

const slideIn = keyframes({
  '0%': {
    transform: 'translateY(4px)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateY(0)',
    opacity: 1,
  },
})

export const cardStageContaienr = style({
  width: '100%',

  selectors: {
    [`${container.newArrival} &`]: {
      animation: `${slideIn} 0.6s 1.6s ease-out backwards`,
    },
  },
})

const glow = keyframes({
  '0%': {
    boxShadow: `0 0 50px 12px rgba(255, 209, 153, 1)`,
  },
  '50%': {
    boxShadow: `0 0 50px 8px rgba(255, 209, 153, 0.6)`,
  },
  '100%': {
    boxShadow: `0 0 50px 12px rgba(255, 209, 153, 1)`,
  },
})

export const cardStage = style({
  perspective: 800,
  width: '100%',
  border: 'none',
  backgroundColor: 'transparent',

  selectors: {
    [`${container.newArrival} &`]: {
      animation: `${glow} 2s infinite`,
    },
  },
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
  alreadyReceived: [
    cardContainerBase,
    {
      animationPlayState: 'paused',
      animationDelay: '-1s',
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
  backfaceVisibility: 'hidden',
})

const daliveryAnimationContainerBase = style({
  width: '100%',
  padding: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})

export const daliveryAnimationContainer = styleVariants({
  default: [daliveryAnimationContainerBase],
  reserved: [daliveryAnimationContainerBase],
})

export const bubbleContainer = style({
  width: '100%',
  paddingBottom: 16,
  display: 'flex',
  justifyContent: 'flex-end',
})

export const bubble = style({
  left: '75%',
  border: `2px solid ${color.gray[80]}`,
  borderRadius: 10,
  width: 'fit-content',
  transition: 'opacity 0.3s 1s, transform 0.3s 1s',

  selectors: {
    [`${daliveryAnimationContainer.default} &`]: {
      opacity: 0,
      transform: 'translateY(4px)',
    },
    [`${daliveryAnimationContainer.reserved} &`]: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

  ':before': {
    content: '',
    position: 'absolute',
    top: '100%',
    left: '50%',
    translate: '-50% -50%',
    rotate: '45deg',
    width: 12,
    height: 12,
    border: `2px solid ${color.gray[80]}`,
    borderRadius: 2,
    backgroundColor: color.gray[100],
  },
})

export const bubbleInner = style({
  backgroundColor: color.gray[100],
  color: color.red[5],
  padding: 10,
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 'bold',
  position: 'relative',
  width: 'fit-content',
})

export const cartContainer = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'relative',
  height: 24,
})

export const cart = style({
  position: 'absolute',
  bottom: 0,
  height: '100%',
  width: 'auto',
  transition: 'left 1.2s 0.3s',

  selectors: {
    [`${daliveryAnimationContainer.default} &`]: {
      left: '0%',
    },
    [`${daliveryAnimationContainer.reserved} &`]: {
      left: '70%',
    },
  },
})

const float = keyframes({
  '0%': {
    transform: 'translateY(-2px)',
  },
  '70%': {
    transform: 'translateY(-6px)',
  },
  '100%': {
    transform: 'translateY(-2px)',
  },
})

export const pin = style({
  height: '100%',
  width: 'auto',
  animation: `${float} 1.5s infinite`,
})

export const progressBarContainer = style({
  width: '100%',
  height: 8,
  backgroundColor: color.gray[80],
  borderRadius: 4,
})

export const progressBar = style({
  height: '100%',
  backgroundColor: color.red[50],
  borderRadius: 'inherit',
  transition: 'width 1.2s',

  selectors: {
    [`${daliveryAnimationContainer.default} &`]: {
      width: '25%',
    },
    [`${daliveryAnimationContainer.reserved} &`]: {
      width: '100%',
    },
  },
})

export const controlContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 10,
  width: '100%',
})

export const control = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 20,
  transition: 'opacity 0.3s 2s',

  selectors: {
    [`${container.newArrival} &`]: {
      opacity: 0,
    },
  },
})

const deliveryDateBase = style({
  fontSize: 12,
  color: color.red[5],
  textAlign: 'center',
  width: '100%',
  fontWeight: 'bold',
  transition: 'opacity 0.3s',
})

export const deliveryDate = styleVariants({
  default: [
    deliveryDateBase,
    {
      opacity: 1,
    },
  ],
  hidden: [
    deliveryDateBase,
    {
      opacity: 0,
    },
  ],
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

export const popupContainer = style({
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
