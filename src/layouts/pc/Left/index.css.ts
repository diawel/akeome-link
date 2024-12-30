import { style } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export const container = style({
  display: 'none',
  '@media': {
    'screen and (min-width: 1024px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      textAlign: 'center',
      position: 'relative',
    },
  },
})

export const cloudImage = style({
  position: 'absolute',
  top: '4%',
  left: 0,
  transform: 'translateX(-40%)',
})

export const flowerImage = style({
  position: 'absolute',
  top: '65%',
  left: 0,
  transform: 'translateX(-20%)',
})

export const treeAndCloud = style({
  position: 'absolute',
  bottom: 0,
  right: 0,
  transform: 'translate(60%, 30%)',
})

export const treeAndMt = style({
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translate(10%, -20%)',
})

export const column = style({
  display: 'grid',
  paddingTop: 40,
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr auto',
  position: 'relative',
  height: '100%',
  overflowY: 'auto',
})

export const content = style({
  paddingTop: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
})

export const discription = style({
  paddingBottom: 16,
  fontSize: 20,
  fontWeight: 'bold',
  color: color.gray[100],
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
  backgroundColor: color.gray[100],
  color: color.red[5],
  border: 'none',
  borderRadius: 12,
  cursor: 'pointer',
  width: '320px',
  height: '46px',
})

export const bottomInfo = style({
  padding: 24,
  textAlign: 'center',
})

export const privacy = style({
  fontSize: 12,
  color: color.gray[100],
  textDecoration: 'none',
  paddingRight: 12,
})

export const terms = style({
  fontSize: 12,
  color: color.gray[100],
  textDecoration: 'none',
})

export const copyRight = style({
  paddingTop: 4,
  fontSize: 12,
  color: color.gray[100],
  display: 'flex',
  gap: '0.5em',
  justifyContent: 'center',
})
