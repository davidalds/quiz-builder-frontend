import { useEffect, useState, type ReactNode } from 'react'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'
import { cookieContext } from './cookieContext'

interface CookieProviderProps {
  children: ReactNode | ReactNode[]
}

function CookieProvider({ children }: CookieProviderProps) {
  const [guestId, setGuestId] = useState<string>('')
  const getGuestIdCookie = () => Cookies.get('guestId')

  useEffect(() => {
    const uuid = getGuestIdCookie() ?? uuidv4()

    if (!getGuestIdCookie()) {
      Cookies.set('guestId', uuid, { expires: 3650 })
    }

    setGuestId(uuid)
  }, [])

  return (
    <cookieContext.Provider value={{ guestId }}>
      {children}
    </cookieContext.Provider>
  )
}

export default CookieProvider
