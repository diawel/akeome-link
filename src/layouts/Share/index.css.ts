import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const postContainer = style({
  position: 'relative',
  width: '100%',
  height: 'auto',
})

export const post = style({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  display: 'block',
  marginTop: '-30px',
})

export const card = style({
  position: 'absolute',
  marginTop: '170px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  width: '282px',
  boxShadow: '0.1px 0.1px 2px rgba(0, 0, 0, 0.3)',
})

export const linkBoxContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '200px',
})

export const linkBoxContent = style({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${color.red[5]}`,
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: color.gray[100],
  width: '326px',
  height: '46px',
})

export const linkText = style({
  flex: 1,
  padding: '10px 16px',
  color: color.red[5],
  fontSize: '13px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const copyButton = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.red[5],
  padding: '12px 23px',
  cursor: 'pointer',
  color: color.red[5],
  fontSize: '14px',
  fontWeight: 'bold',
  border: 'none',
  width: '65px',
})

export const copiedPopup = style({
  position: 'relative',
  paddingLeft: '235px',
});

export const hidden = style({
  opacity: 0,
});

export const linkInput = style({
  flex: 1,
  padding: '10px 16px',
  fontSize: '16px',
  color: color.red[5],
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  textOverflow: 'ellipsis',
  fontWeight: 'bold',
  cursor: 'default',
  width: '320px',
})

export const xContainer = style({
  width: '72px',
  height: '56px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  padding: '18px 26px'
})

export const lineContainer = style({
  width: '72px',
  height: '56px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  padding: '13px 21px'
})

export const qrContainer = style({
  width: '72px',
  height: '56px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  padding: '8px 24px 3px 23px'
})

export const downloadContainer = style({
  width: '72px',
  height: '56px',
  backgroundColor: 'white',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: 'none',
})

export const downloadContent = style({
  display: 'flex',
  alignItems: 'center',
})

export const downloadText = style({
  fontSize: '13px',
  fontWeight: 'bold',
  paddingLeft: '4px',
})

export const iconButtonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '25px',
})

export const buttonRightSpace = style({
  paddingRight: '13px',
})

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '32px',
  marginBottom: '52px',
  cursor: 'pointer',
})

export const buttonContent = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.red[5],
  width: '127px',
  height: '42px',
  borderRadius: '12px',
})

export const buttonText = style({
  fontSize: '16px',
  color: 'white',
  fontWeight: 'bold',
})

export const cardLink = style({
  textDecoration: 'none',
})