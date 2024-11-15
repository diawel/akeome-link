import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'


export const control = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
})

export const center = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const title = style({
  fontSize: '24px',
  fontWeight: 'bold',
  paddingBottom: '4px'
})

export const creatorName = style({
  fontSize: '16px',
})

export const cardSpace = style({
  padding: '28px 0px',
})

export const card = style({
  width: '282px',
  boxShadow: '0.1px 0.1px 2px rgba(0, 0, 0, 0.3)',
})

export const primaryButton = style({
  padding: '10px 24px',
  backgroundColor: color.red[5],
  color: color.gray[100],
  borderRadius: '12px',
  cursor: 'pointer',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  width: '280px',
  height: '42px'
})

export const copyAndEditButton = style({
  width: '172px',
  height: '42px',
  backgroundColor: 'white',
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: 'none',
})

export const deleteButton = style({
  width: '96px',
  height: '42px',
  backgroundColor: 'white',
  color: color.red[5],
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: 'none',
})

export const buttonText = style({
  fontWeight: 'bold',
  fontSize: '16px',
})

export const buttonSpace = style({
  paddingRight: '13px',
})

export const link = style({
  textDecoration: 'none',
})

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '32px 0px',
})