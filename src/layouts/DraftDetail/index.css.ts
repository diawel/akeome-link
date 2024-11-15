import { style } from '@vanilla-extract/css'
import { color } from '../../utils/styleSchema'

export const screen = style({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const control = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  width: '100%',
})

export const container = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 28,
  flex: 1,
  padding: '32px 32px 64px',
})

export const title = style({
  fontSize: '24px',
  fontWeight: 'bold',
  paddingBottom: '4px',
})

export const creatorName = style({
  fontSize: '16px',
})

export const card = style({
  width: '282px',
  boxShadow: '0.1px 0.1px 2px rgba(0, 0, 0, 0.3)',
})

export const link = style({
  textDecoration: 'none',
})

export const editButton = style({
  width: '172px',
  height: '42px',
  backgroundColor: 'white',
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: 'none',
})

export const deleteButton = style({
  width: '96px',
  height: '42px',
  backgroundColor: 'white',
  color: color.red[5],
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: 'none',
})

export const buttonText = style({
  fontWeight: 'bold',
  fontSize: '16px',
})

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 14,
})
