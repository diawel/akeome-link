import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
})

export const cardWrapper = style({
  textAlign: 'center',
})

export const title = style({
  fontSize: '1.5em',
  fontWeight: 'bold',
  marginBottom: '0.5em',
})

export const creatorName = style({
  fontSize: '1em',
  color: '#555',
})
