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

export const draftCardTitle = style({
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '12px',
  marginBottom: '12px',
  color: `${color.gray[40]}`,
  whiteSpace: 'nowrap',
  display: 'flex',
  gap: 6,
  alignItems: 'center',
  justifyContent: 'center',
})

export const newCardButtonSizeInner = style({
  width: '100%',
  height: 'auto',
  aspectRatio: '100 / 148',
  position: 'relative',
  overflow: 'hidden',
  color: `${color.red[50]}`,
  borderRadius: '8px',
  borderWidth: '2px',
  borderStyle: 'dotted',
  cursor: 'pointer',
})

export const newCardButtonContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: `${color.red[50]}`,
  borderRadius: '8px',
  borderWidth: '2px',
  borderStyle: 'dotted',
  cursor: 'pointer',

  width: 400,
  height: 592,
  backgroundColor: '#fff',
  position: 'absolute',
  left: '50%',
  top: '50%',
  translate: '-50% -50%',
  userSelect: 'none',
})

export const newCardButtonIcon = style({
  fontSize: '30px',
})

export const newCardButtonTextContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
})

export const newCardButtonText = style({
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '12px',
  marginBottom: '12px',
  color: `${color.red[50]}`,
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