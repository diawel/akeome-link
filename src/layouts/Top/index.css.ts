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
  zIndex: 1,
})

export const logoImage = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '46px 0px 46px 0px',
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

export const mainDescription = style({
  position: 'relative',
  zIndex: 1,
})

export const text2024 = style({
  fontSize: 96,
  fontWeight: 'bold',
  color: '#DCDCDC',
  paddingTop: 85,
  lineHeight: '144%',
})

export const imageContainer1 = style({
  position: 'relative',
  display: 'flex',
})

export const descriptionImage1 = style({
  display: 'block',
  width: 237,
  height: 354,
  marginLeft: 32,
})

export const overlayText1 = style({
  position: 'absolute',
  right: '5%',
  width: 240,
  fontSize: 24,
  fontWeight: 'bold',
  color: 'black',
})

export const imageContainer2 = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row-reverse',
  paddingTop: 36,
})

export const descriptionImage2 = style({
  display: 'block',
  width: 237,
  height: 354,
  marginRight: 32,
})

export const overlayText2 = style({
  position: 'absolute',
  top: 24,
  left: '5%',
  width: 270,
  fontSize: 24,
  fontWeight: 'bold',
  color: 'black',
})

export const imageContainer3 = style({
  position: 'relative',
  display: 'flex',
  paddingTop: 36,
})

export const descriptionImage3 = style({
  display: 'block',
  width: 237,
  height: 354,
  marginLeft: 32,
})

export const overlayText3 = style({
  position: 'absolute',
  top: '46px',
  right: 0,
  width: 240,
  fontSize: 24,
  fontWeight: 'bold',
  color: 'black',
})

export const text2025 = style({
  fontSize: 96,
  fontWeight: 'bold',
  color: '#E0CBA2',
  lineHeight: '144%',
  textAlign: 'right',
})

export const backgroundImage = style({
  position: 'absolute',
  paddingTop: 70,
  top: '66%',
  left: 0,
  width: '100%',
  objectFit: 'cover',
  zIndex: 0,
  transform: 'rotate(−30deg)',
})
