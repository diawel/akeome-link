import { style } from '@vanilla-extract/css'
import qrBackgroundImage from './qr-background.svg'
import { color } from '../../../utils/styleSchema'

export const container = style({
  position: 'relative',
  width: '100%',
  backgroundImage: `url(${qrBackgroundImage.src})`,
  backgroundSize: 'cover',
  color: color.gray[100],
  fontSize: '2rem',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingBlock: 72,
  minHeight: '100%',
  justifyContent: 'center',
})

export const image = style({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
})

export const qrCode = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: '22px',
  width: '100%',
  height: '100%',
  borderRadius: '12px',
})

export const qrCodeSpace = style({
  padding: '56px 0px 52px 0px',
})

export const creatorName = style({
  fontSize: '20px',
  width: '260px',
  color: 'black',
  backgroundColor: 'white',
  padding: '25px 80px',
  borderRadius: '12px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const discriptionText = style({
  fontSize: '20px',
  paddingTop: '35px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const returnButton = style({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '24px 16px',
  top: 0,
  left: 0,
})
