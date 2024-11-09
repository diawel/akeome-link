import { style } from '@vanilla-extract/css'

export const card = style({
  backgroundColor: "#fff",
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  fontSize: "14px",
  color: "#333",
  lineHeight: "1.6",
  maxWidth: "800px",
  margin: "8px",
})

export const centeredText = style({
  padding: '8px',
  fontSize: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

export const beginningText = style({
  padding: '8px 0px'
})

export const articleTitle = style({
  fontWeight: "bold",
  fontSize: "18px",
  padding: "16px 0px 8px 0px",
});

export const ulItem = style({
  listStyleType: 'disc',
  paddingLeft: '14px'
});

export const listItem = style({
  marginBottom: "8px",
  fontSize: "14px",
});

export const endSentenceText = style({
  padding: '16px 0px',
  fontSize: '24px',
})