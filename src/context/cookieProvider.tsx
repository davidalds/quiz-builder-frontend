import { type ReactNode } from 'react'
import { cookieContext } from './cookieContext'
import { useGuestId } from '@/hooks/userServiceHooks'

interface CookieProviderProps {
  children: ReactNode | ReactNode[]
}

function CookieProvider({ children }: CookieProviderProps) {
  useGuestId()
  return (
    <cookieContext.Provider value={null}>{children}</cookieContext.Provider>
  )
}

export default CookieProvider
