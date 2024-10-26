import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const container = style({
  width: '100%',
  height: '100%',
  aspectRatio: '100 / 148',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
})

export const sizer = style({
  width: 'fit-content',
  maxWidth: '100%',
  height: '100%',
  aspectRatio: '100 / 148',
  display: 'flex',
  alignItems: 'center',
})

export const sizerInner = style({
  width: '100%',
  height: 'auto',
  aspectRatio: '100 / 148',
  position: 'relative',
  overflow: 'hidden',
})

export const card = style({
  width: 400,
  height: 592,
  backgroundColor: '#fff',
  position: 'absolute',
  left: '50%',
  top: '50%',
  translate: '-50% -50%',
  userSelect: 'none',
})

export const text = style({
  position: 'relative',
  fontSize: 16,
  color: '#000',
  fontWeight: 700,
  textWrap: 'nowrap',
})

export const userImageContainer = style({
  position: 'relative',
  width: 160,
  height: 160,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const stickerContainer = style({
  position: 'relative',
  width: 160,
  height: 160,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const sticker = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
})

const interactionContainerBase = style({
  position: 'absolute',
  translate: '-50% -50%',
  padding: 8,
})

export const interactionContainer = styleVariants({
  default: [interactionContainerBase],
  focused: [
    interactionContainerBase,
    {
      outline: `1px dashed ${color.gray[80]}`,
    },
  ],
})

const controlBase = style({
  border: 'none',
  backgroundColor: 'transparent',

  selectors: {
    [`.${interactionContainer.default} > &`]: {
      display: 'none',
    },
  },
})

export const control = styleVariants({
  remove: [
    controlBase,
    {
      position: 'absolute',
      top: 0,
      right: 0,
      translate: '50% -50%',
    },
  ],
  rotate: [
    controlBase,
    {
      position: 'absolute',
      bottom: 0,
      right: 0,
      translate: '50% 50%',
    },
  ],
  zoom: [
    controlBase,
    {
      position: 'absolute',
      bottom: 0,
      left: 0,
      translate: '-50% 50%',
    },
  ],
})
