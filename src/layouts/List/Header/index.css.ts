import { style } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export const headerContainer = style({
  backgroundColor: '#fff',
  position: 'relative',
  top: 0,
  zIndex: 1000,
})

export const title = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
})

export const icon = style({})

export const tabContainer = style({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '16px',
  color: `${color.gray[5]}`,
  borderBottom: '1px solid #ddd',
  backgroundColor: '#fff',
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
  color: `${color.gray[5]}`,
})

export const activeTab = style({
  position: 'relative',
  color: `${color.red[5]}`,
  fontWeight: 'bold',
  '::after': {
    content: "''",
    position: 'absolute',
    bottom: '-2px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '150px',
    height: '2px',
    backgroundColor: `${color.red[5]}`,
  },
})

export const notificationIcon = style({
  position: 'absolute',
  top: '22px',
  right: '33px',
  display: 'flex',
  alignItems: 'center',
})

// export const notificationCount = style({
//   position: 'absolute',
//   top: '-5px',
//   right: '-10px',
//   backgroundColor: `${color.red[5]}`,
//   color: `${color.gray[100]}`,
//   borderRadius: '50%',
//   width: '20px',
//   height: '20px',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontSize: '12px',
//   boxShadow: `0 0 0 1px ${color.gray[100]}`,
// })
