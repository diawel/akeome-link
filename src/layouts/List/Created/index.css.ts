import { style } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export * from '../common.css'

export const newCardButtonSizeInner = style({
  width: '100%',
  height: 'auto',
  aspectRatio: '100 / 148',
  position: 'relative',
  overflow: 'hidden',
  color: `${color.red[50]}`,
  borderRadius: '8px',
  borderWidth: '2px',
  borderStyle: 'dotted',
  cursor: 'pointer',
})

export const newCardButtonContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: `${color.red[50]}`,
  borderRadius: '8px',
  borderWidth: '2px',
  borderStyle: 'dotted',
  cursor: 'pointer',

  width: 400,
  height: 592,
  backgroundColor: '#fff',
  position: 'absolute',
  left: '50%',
  top: '50%',
  translate: '-50% -50%',
  userSelect: 'none',
})

export const newCardButtonIcon = style({
  fontSize: '30px',
})

export const newCardButtonTextContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
})

export const newCardButtonText = style({
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '12px',
  marginBottom: '12px',
  color: `${color.red[50]}`,
})

export const draftCardTitle = style({
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '12px',
  marginBottom: '12px',
  color: `${color.gray[40]}`,
  whiteSpace: 'nowrap',
  display: 'flex',
  gap: 6,
  alignItems: 'center',
  justifyContent: 'center',
})
