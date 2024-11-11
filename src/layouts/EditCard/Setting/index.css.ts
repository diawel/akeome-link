import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export const screen = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
})

export const cardContainer = style({
  padding: '40px 16px 16px',
})

export const card = style({
  backgroundColor: color.gray[100],
  borderRadius: 10,
  border: `1px solid ${color.gray[80]}`,
  padding: '30px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  position: 'relative',
})

export const postNumberContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: -8,
})

export const inputContainer = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: 8,
})

export const titleGroup = style({
  display: 'flex',
  gap: 8,
  alignItems: 'flex-end',
  justifyContent: 'space-between',
})

export const title = style({
  fontSize: 16,
  fontWeight: 'bold',
  color: color.gray[5],
})

export const error = style({
  fontSize: 12,
  fontWeight: 'bold',
  color: color.red[5],
})

const inputBase = style({
  padding: '8px 12px',
  border: '1px solid',
  borderRadius: 4,
  fontSize: 16,
  color: color.gray[5],
})

export const input = styleVariants({
  default: [
    inputBase,
    {
      borderColor: color.gray[80],
      backgroundColor: color.gray[90],
      outlineColor: color.gray[5],
    },
  ],
  error: [
    inputBase,
    {
      borderColor: color.red[5],
      backgroundColor: color.red[90],
      outlineColor: color.red[5],
    },
  ],
})

export const toggleContainer = style({
  display: 'flex',
  gap: 8,
  justifyContent: 'space-between',
})

export const toggleGroup = style({
  display: 'flex',
  gap: 8,
  flexDirection: 'column',
})

const toggleBase = style({
  width: 60,
  height: 28,
  borderRadius: 14,
  position: 'relative',
  cursor: 'pointer',
  transition: 'background-color 0.2s',

  ':after': {
    content: '',
    display: 'block',
    width: 22,
    height: 22,
    borderRadius: '50%',
    backgroundColor: color.gray[100],
    position: 'absolute',
    top: 3,
    transition: 'left 0.2s',
  },
})

export const toggle = styleVariants({
  on: [
    toggleBase,
    {
      backgroundColor: color.red[5],
      ':after': {
        left: 'calc(100% - 25px)',
      },
    },
  ],
  off: [
    toggleBase,
    {
      backgroundColor: color.gray[80],
      ':after': {
        left: 3,
      },
    },
  ],
})

export const checkbox = style({
  display: 'none',
})

export const deliveredAtGroup = style({
  display: 'flex',
  gap: 4,
  flexDirection: 'column',
})

export const subTitle = style({
  fontSize: 12,
  color: color.gray[5],
  fontWeight: 'bold',
})

export const deliveredAt = style({
  padding: 8,
  width: 172,
  height: 42,
  backgroundColor: color.gray[90],
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 'bold',
  color: color.gray[5],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const expressLabel = style({
  position: 'absolute',
  right: 4,
  top: 36,
})
