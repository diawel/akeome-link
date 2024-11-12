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
  position: 'relative',
  width: 290,
  maxWidth: '100%',
  overflow: 'hidden',
  borderRadius: 12,
})

export const content = style({
  padding: '72px 16px 50px',
  backgroundColor: color.red[5],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 40,
})

export const text = style({
  color: color.gray[100],
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: 1.75,
})

export const button = style({
  backgroundColor: color.gray[100],
  color: color.gray[5],
  padding: 20,
  border: 'none',
  width: '100%',
  fontWeight: 'bold',
  fontSize: 16,
  cursor: 'pointer',
})
