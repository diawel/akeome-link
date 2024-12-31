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
  paddingInline: 48,
  minHeight: '100%',
  justifyContent: 'center',
  gap: 48,
})

export const logo = style({
  height: 'auto',
  width: '100%',
  maxWidth: 280,
})

export const qrCodeContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.gray[100],
  padding: '22px',
  width: '100%',
  aspectRatio: '1',
  borderRadius: '12px',
  maxWidth: 280,
})

export const qrCode = style({
  width: '100% !important',
  height: '100% !important',
})

export const creatorNameContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  width: '100%',
  maxWidth: 280,
})

export const creatorName = style({
  fontSize: '20px',
  width: '100%',
  color: 'black',
  backgroundColor: color.gray[100],
  padding: 24,
  borderRadius: '12px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
})

export const discriptionText = style({
  fontSize: 20,
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
