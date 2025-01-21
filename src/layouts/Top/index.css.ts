import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const container = style({
  height: '100%',
  backgroundColor: color.gray[90],
  overflowX: 'hidden',
  position: 'relative',
})

export const content = style({
  position: 'relative',
  overflowX: 'hidden',
  zIndex: 1,
})

export const logoContainer = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '46px 0px 46px 0px',
})

export const logoImage = style({
  width: 255,
  maxWidth: '100%',
  height: 'auto',
})

export const topContent = style({
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

export const descriptionText = style({
  paddingTop: '130%',
  paddingLeft: 24,
  fontSize: 24,
  fontWeight: 'bold',
  color: 'white',
  lineHeight: '200%',
  paddingBottom: 32,
})

export const registerButton = style({
  display: 'flex',
  justifyContent: 'center',

  '@media': {
    'screen and (min-width: 1024px)': {
      display: 'none',
    },
  },
})

export const loginButton = style({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 13,
  paddingBottom: 49,

  '@media': {
    'screen and (min-width: 1024px)': {
      display: 'none',
    },
  },
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
  textAlign: 'center',
  textDecoration: 'none',
})

export const mainDescription = style({
  position: 'relative',
  zIndex: 1,
})

export const text2024 = style({
  fontSize: 96,
  fontWeight: 'bold',
  color: '#E0CBA2',
  paddingTop: 85,
  lineHeight: '144%',
})

export const patternContainer = style({
  position: 'relative',
  width: '100%',
  height: 0,
})

export const pattern1 = style({
  position: 'absolute',
  top: -120,
  right: -48,
})

export const pattern2 = style({
  position: 'absolute',
  top: -200,
  left: -40,
})

export const imageContainer1 = style({
  position: 'relative',
  display: 'flex',
  marginInline: 32,
  zIndex: 1,
})

export const descriptionImage1 = style({
  display: 'block',
  width: 237,
  height: 'auto',
  paddingTop: 36,
})

export const overlayText = style({
  boxDecorationBreak: 'clone',
  backgroundColor: color.gray[100],
  padding: 4,
  fontSize: 24,
  fontWeight: 'bold',
  color: color.gray[5],
})

export const overlayText1 = style({
  position: 'absolute',
  top: 0,
  right: 0,
})

export const imageContainer2 = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row-reverse',
  paddingTop: 16,
  marginInline: 32,
  marginTop: 36,
  zIndex: 1,
})

export const descriptionImage2 = style({
  display: 'block',
  width: 237,
  height: 'auto',
})

export const overlayText2 = style({
  position: 'absolute',
  top: 0,
  left: 0,
})

export const imageContainer3 = style({
  position: 'relative',
  display: 'flex',
  paddingTop: 36,
  marginInline: 32,
  marginTop: 72,
  zIndex: 1,
})

export const descriptionImage3 = style({
  display: 'block',
  width: 237,
  height: 'auto',
})

export const overlayText3 = style({
  position: 'absolute',
  top: 0,
  right: 0,
})

export const text2025 = style({
  fontSize: 96,
  fontWeight: 'bold',
  color: '#E0CBA2',
  lineHeight: '144%',
  textAlign: 'right',
  paddingBottom: 161,
  zIndex: 1,
  position: 'relative',
})

export const backgroundImage = style({
  position: 'absolute',
  top: -100,
  width: '100%',
  zIndex: 0,
  transform: 'rotate(−30deg)',
})

export const orangeLogoContainer = style({
  textAlign: 'right',
  paddingRight: 18,
})

export const orangeLogoImage = style({
  zIndex: 2,
})

export const akeomeLinkText = style({
  fontSize: 24,
  fontWeight: 'bold',
  width: 218,
  borderBottom: '3px solid #E0CBA2',
  marginLeft: 51,
})

export const textSpace = style({
  marginTop: 12,
})

export const startButtonContainer = style({
  paddingTop: 48,
  textAlign: 'center',
})

export const startButtonLayout = style({
  padding: '12px 24px',
  fontSize: 16,
  fontWeight: 'bold',
  backgroundColor: color.red[5],
  color: 'white',
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
  textDecoration: 'none',
  textAlign: 'center',
})

export const postImageContainer = style({
  paddingTop: 48,
  textAlign: 'center',
})

export const postImage = style({})
