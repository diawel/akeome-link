import { style } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export const headerContainer = style({
  backgroundColor: color.red[5],
  position: 'relative',
  top: 0,
  zIndex: 1000,
})

export const title = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  color: color.gray[100],
  height: 72,
})

export const icon = style({
  height: 20,
  width: 'auto',
})

export const tabContainer = style({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '16px',
  borderBottom: `2px solid ${color.red[5]}`,
  backgroundColor: color.red[5],
  position: 'sticky',
  top: 0,
  zIndex: 999,
})

export const tab = style({
  flex: 1,
  textAlign: 'center',
  padding: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: `${color.gray[80]}`,
})

export const activeTab = style({
  position: 'relative',
  color: `${color.gray[100]}`,
  fontWeight: 'bold',
  '::after': {
    content: "''",
    position: 'absolute',
    bottom: '-2px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '150px',
    height: '2px',
    backgroundColor: `${color.gray[100]}`,
  },
})

export const returnButtonContainer = style({
  position: 'absolute',
  top: '50%',
  left: 16,
  transform: 'translateY(-50%)',
})
