import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export const controlContainer = style({
  height: 108,
  width: '100%',
  overflow: 'auto',
  backgroundColor: color.gray[100],
})

export const control = style({
  display: 'flex',
  gap: 16,
  padding: 16,
  alignItems: 'center',
  width: 'fit-content',
  height: '100%',
  minWidth: '100%',
})

export const controlGrid = style({
  height: '100%',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 12,
  paddingBlock: 8,
})

export const controlButton = style({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  border: 'none',
  gap: 6,
  fontSize: 10,
  backgroundColor: color.gray[90],
  color: color.gray[5],
  fontWeight: 'bold',
  borderRadius: 6,
  cursor: 'pointer',
  position: 'relative',
})

export const controlInput = style({
  position: 'absolute',
  top: 0,
  left: 0,
  pointerEvents: 'none',
  opacity: 0,
})

export const stickerButton = style({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  backgroundColor: 'transparent',
  position: 'relative',
})

export const sticker = style({
  width: 'auto',
  height: '100%',
  filter: 'drop-shadow(0 2px 1px rgba(0, 0, 0, 0.25))',
})

export const stickerLabel = style({
  position: 'absolute',
  top: 0,
  right: 0,
})

export const nav = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  paddingInline: 10,
  borderTop: `1px solid ${color.gray[90]}`,
  backgroundColor: color.gray[100],
})

const navButtonBase = style({
  padding: '16px 4px max(env(safe-area-inset-bottom), 16px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  fontSize: 14,
  gap: 2,
  marginTop: -1,
  backgroundColor: 'transparent',
  borderTop: `2px solid`,
  fontWeight: 'bold',
  cursor: 'pointer',
})

export const navButton = styleVariants({
  default: [
    navButtonBase,
    {
      color: color.gray[5],
      borderColor: 'transparent',
    },
  ],
  active: [
    navButtonBase,
    {
      color: color.red[5],
      borderColor: color.red[5],
    },
  ],
})

export const navButtonIcon = style({
  fontSize: 24,
})

export const textEditWindow = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr',
  alignItems: 'center',
  gap: 16,
  padding: 16,
  backgroundColor: `rgb(255 255 255 / 0.9)`,
})

export const textEditButtonContainer = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
})

export const textEditButton = style({
  padding: 8,
  border: 'none',
  color: color.red[5],
  backgroundColor: 'transparent',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: 16,
})

export const textEditTextareaWrapper = style({
  position: 'relative',
  width: '100%',
  color: 'rgb(0 0 0 / 0)',
  whiteSpace: 'pre-wrap',
  fontSize: 20,
  textAlign: 'center',
  wordBreak: 'break-word',
  wordWrap: 'break-word',
  maxHeight: '100%',
  overflow: 'auto',
})

export const textEditTextarea = style({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
  resize: 'none',
  textAlign: 'center',
  font: 'inherit',
  letterSpacing: 'inherit',
})

export const errorContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 6,
  width: 'max-content',
  maxWidth: 'calc(100% - 32px)',
  padding: 10,
  borderRadius: 10,
  backgroundColor: color.gray[90],
  color: color.red[5],
  position: 'absolute',
  top: '50%',
  left: '50%',
  translate: '-50% -50%',
  fontSize: 12,
  fontWeight: 'bold',
  textAlign: 'center',
})
