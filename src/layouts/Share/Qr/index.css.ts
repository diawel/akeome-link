import { style } from '@vanilla-extract/css'

export const backgroundImage = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

export const image = style({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

export const textOverlay = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  fontSize: '2rem',
  fontWeight: 'bold',
  });

export const qrCode = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: '22px',
  width: '100%',
  height: '100%',  
  borderRadius: '12px'
})

export const qrCodeSpace = style({
  padding: '56px 0px 52px 0px'
}) 

export const creatorName = style({
  fontSize: '20px',
  width: '260px',
  color: 'black',
  backgroundColor: 'white',
  padding: '25px 80px',
  borderRadius: '12px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const discriptionText = style({
  fontSize: '20px',
  paddingTop: '35px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const returnButton = style({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '24px 16px',
})