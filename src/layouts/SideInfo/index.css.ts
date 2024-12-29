import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  backgroundColor: color.red[5],
  textAlign: 'center',
  position: 'relative',
})

export const cloudImage1 = style({
  position: 'fixed',
  top: '4%',
  left: 0,
  width: 'auto',
  height: '100%',
  objectFit: 'cover',
})

export const flowerImage1 = style({
  position: 'fixed',
  bottom: 0,
  right: 0,
  width: 'auto',
  objectFit: 'cover',
})

export const flowerImage2 = style({
  position: 'fixed',
  top: '65%',
  left: 0,
  width: 'auto',
  objectFit: 'cover',
})

export const treeAndCloud = style({
  position: 'fixed',
  bottom: 0,
  left: '44%',
  width: 'auto',
  objectFit: 'cover',
})

export const treeAndMt = style({
  position: 'fixed',
  top: 0,
  left: '42%',
  width: 'auto',
  objectFit: 'cover',
})

export const content = style({
  paddingTop: 104,
})

export const discription = style({
  paddingBottom: 16,
  fontSize: 20,
  fontWeight: 'bold',
  color: 'white',
})

export const largeText = style({
  fontSize: '24px',
})

export const registerButton = style({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 52,
})

export const loginButton = style({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 13,
})

export const buttonLayout = style({
  padding: '12px 24px',
  fontSize: 16,
  fontWeight: 'bold',
  backgroundColor: 'white',
  color: color.red[5],
  border: 'none',
  borderRadius: 12,
  cursor: 'pointer',
  width: '320px',
  height: '46px',
})

export const bottomInfo = style({
  position: 'absolute',
  bottom: 23,
  left: '50%',
  transform: 'translateX(-50%)',
  textAlign: 'center',
})

export const privacy = style({
  fontSize: 12,
  fontWeight: 'bold',
  color: 'white',
  textDecoration: 'none',
  paddingRight: 12,
})

export const terms = style({
  fontSize: 12,
  fontWeight: 'bold',
  color: 'white',
  textDecoration: 'none',
})

export const copyRight = style({
  paddingTop: 4,
  fontSize: 12,
  fontWeight: 'bold',
  color: 'white',
})
