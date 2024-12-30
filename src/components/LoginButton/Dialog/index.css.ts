import { style } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export const screen = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backdropFilter: 'brightness(0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
})

export const container = style({
  width: '100%',
  maxWidth: 480,
  backgroundColor: color.gray[90],
  borderRadius: 12,
  padding: 30,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  alignItems: 'center',
})

export const button = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 24px',
  textDecoration: 'none',
  backgroundColor: color.gray[100],
  color: color.gray[5],
  borderRadius: 12,
  fontWeight: 'bold',
  border: 'none',
  fontSize: 16,
  cursor: 'pointer',
})
