import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'


export const control = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
})

export const container = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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

export const buttonSpace = style({
  paddingRight: '13px',
})

export const link = style({
  textDecoration: 'none'
})

export const editButton = style({
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

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
})