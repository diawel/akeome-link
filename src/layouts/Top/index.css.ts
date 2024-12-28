import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  backgroundColor: 'white',
  textAlign: 'center',
})

export const content = style({
  paddingTop: '140px',
})

export const discription = style({
  paddingTop: '12px',
  paddingBottom: '192px',
  fontSize: '20px',
  fontWeight: 'bold',
})

export const redText = style({
  color: color.red[5],
})

export const image = style({
  marginBottom: '114px',
  maxWidth: '100%',
  height: 'auto',
})

export const loginButton = style({
  display: 'flex',
  justifyContent: 'center',
})

export const buttonLayout = style({
  padding: '14px 24px',
  fontSize: '16px',
  backgroundColor: color.red[5],
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  width: '280px',
  height: '50px',
  textDecoration: 'none',
})

export const linkText = style({
  paddingTop: '11px',
})

export const privacy = style({
  fontSize: '12px',
  fontWeight: 'bold',
  color: color.red[5],
  textDecoration: 'none',
  paddingRight: '12px',
})

export const terms = style({
  fontSize: '12px',
  fontWeight: 'bold',
  color: color.red[5],
  textDecoration: 'none',
})
