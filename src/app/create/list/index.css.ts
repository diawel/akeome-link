import { style, styleVariants } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export const container = style({
  padding: '40px 16px 0 16px', // 上下は0、左右は16pxの余白
})

export const cardContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
})

export const cardWrapper = style({
  textAlign: 'center',
})

export const title = style({
  fontSize: '1.5em',
  fontWeight: 'bold',
  marginBottom: '0.5em',
})

export const creatorName = style({
  fontSize: '1em',
  color: '#555',
})

export const newCardContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: `${color.red[50]}`,
  borderRadius: '8px',
  height: '73px',
  borderWidth: '2px',
  borderStyle: 'dotted',
  cursor: 'pointer',
})

export const newCardIcon = style({
  fontSize: '30px',
  marginRight: '20px',
})

export const newCardText = style({
  fontSize: '16px',
  fontWeight: 'bold',
})
