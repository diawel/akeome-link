'use client'

import { createContext, useContext, useState } from 'react'
import Dialog from './Dialog'

const loginDialogContext = createContext<
  | {
      open: () => void
    }
  | undefined
>(undefined)

export const useLoginDialog = () => {
  const context = useContext(loginDialogContext)
  if (context === undefined) {
    throw new Error('useLoginDialog must be used within a LoginDialogProvider')
  }
  return context
}

type LoginDialogProviderProps = {
  children: React.ReactNode
}

const LoginDialogProvider = ({ children }: LoginDialogProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <loginDialogContext.Provider
      value={{
        open: () => setIsOpen(true),
      }}
    >
      {children}
      {isOpen && <Dialog onClose={() => setIsOpen(false)} />}
    </loginDialogContext.Provider>
  )
}

export default LoginDialogProvider
