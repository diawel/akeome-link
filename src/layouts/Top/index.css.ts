import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const container = style({
  height: '100%',
  backgroundColor: 'white',
  overflowX: 'hidden',
})

export const content = style({
  position: 'relative',
  overflowX: 'hidden',
})

export const logoImage = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '46px 0px 46px 0px',
})

export const mainDiscription = style({
  borderRadius: '14px',
  position: 'relative',
  zIndex: 1,
})

export const redContainer = style({
  borderRadius: 14,
  backgroundColor: color.red[5],
  margin: '0px 32px',
  position: 'relative',
  zIndex: 1,
})

export const smartPhoneImage = style({
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
  display: 'block',
  margin: '0 auto',
  position: 'absolute',
  top: -50,
  left: 0,
  right: 0,
  zIndex: 2,
  transform: 'rotate(1deg)',
})

export const discriptionText = style({
  paddingTop: 430,
  paddingLeft: 27,
  fontSize: 24,
  fontWeight: 'bold',
  color: 'white',
  lineHeight: '200%',

  '@media': {
    'screen and (max-width: 380px)': {
      paddingLeft: 24,
      paddingTop: 390,
    },
  },
})

export const registerButton = style({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 32,
})

export const loginButton = style({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 13,
  paddingBottom: 49,
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
  width: 'calc(100% - 50px)',
  maxWidth: 277,
  height: 46,
  margin: '0 auto',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})
