import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const postContainer = style({
  position: 'relative',
  width: '100%',
  height: 'auto',
})

export const post = style({
  width: '100%',
})

export const card = style({
  position: 'absolute',
  marginTop: '180px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  width: '282px',
  padding: '16px',
})

export const linkBoxContainer = style({
  paddingLeft: '16px',
})

export const linkBoxContent = style({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${color.red[5]}`,
  marginTop: '220px',
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.red[5],
  marginTop: '8px',
  padding: '10px 12px',
  cursor: 'pointer',
  color: color.red[5],
  fontSize: '14px',
  fontWeight: 'bold',
})

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
})
