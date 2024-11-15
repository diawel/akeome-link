import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export * from '../common.css'

const floatingButtonBase = style({
  position: 'absolute',
  bottom: 48,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 280,
  maxWidth: 'calc(100% - 32px)',
  padding: '10px 24px',
  borderRadius: 12,
  backgroundColor: color.red[5],
  color: color.gray[100],
  fontSize: 16,
  fontWeight: 'bold',
  border: 'none',
})

export const floatingButton = styleVariants({
  default: [
    floatingButtonBase,
    {
      cursor: 'pointer',
    },
  ],
  disabled: [floatingButtonBase, { pointerEvents: 'none', opacity: 0.5 }],
})
