import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { AuthContext } from './authContext'
import type { loginType, userType } from './types'
import Cookies from 'js-cookie'
import { api } from '@/services'
import { useQueryClient } from '@tanstack/react-query'
import { logout, setLogoutHandler } from './auth-event'

interface IProps {
  children: ReactNode
}

export default function AuthProvider({ children }: IProps) {
  const defaultValues: userType = {
    publicId: '',
    email: '',
    name: '',
  }
  const queryClient = useQueryClient()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Cookies.get('isLoggedIn') ? true : false,
  )
  const [user, setUser] = useState<userType>(defaultValues)

  const signIn = async ({ email, password }: loginType) => {
    await api.post<{ access_token: string; refresh_token: string }>(
      'auth/login',
      {
        email,
        password,
      },
    )
    Cookies.set('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  const logoutHandler = useCallback(() => {
    queryClient.invalidateQueries()
    setIsLoggedIn(false)
    Cookies.remove('isLoggedIn')
  }, [queryClient])

  const isAuthenticated = useCallback(async () => {
    try {
      const { data: user } = await api.get<userType>('users/user')
      setUser({
        publicId: user.publicId,
        email: user.email,
        name: user.name,
      })
    } catch {
      logout()
    }
  }, [])

  useEffect(() => {
    setLogoutHandler(logoutHandler)
    isAuthenticated()
  }, [logoutHandler, isAuthenticated])

  return (
    <AuthContext.Provider value={{ user, signIn, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
