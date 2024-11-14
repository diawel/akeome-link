import { style } from '@vanilla-extract/css'
import { color } from '../../../utils/styleSchema'

export * from '../common.css'

export const noCardContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const noCardMessage = style({
  fontSize: '16px',
  fontWeight: 'bold',
  color: color.red[5],
  padding: '90px 0px 45px 0px',
})
