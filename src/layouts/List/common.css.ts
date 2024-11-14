import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const container = style({
  padding: '40px 16px 0 16px',
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

export const card = style({
  border: `1px solid ${color.gray[80]}`,
  cursor: 'pointer',
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

export const content = style({
  overflow: 'hidden',
})

export const cardTitle = style({
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '12px',
  marginBottom: '12px',
  color: `${color.gray[5]}`,
  maxWidth: 'unset',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const cardLink = style({
  textDecoration: 'none',
})

export const noCardContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const noCardMessage = style({
  fontSize: '16px',
  fontWeight: 'bold',
  color: color.red[5],
  padding: '90px 0px 45px 0px'
})