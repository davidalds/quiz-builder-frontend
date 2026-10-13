import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AuthContext } from './authContext'
import type { loginType, userType } from './types'
import Cookies from 'js-cookie'
import { api } from '@/services'
import { useQueryClient } from '@tanstack/react-query'
import { logout, setLogoutHandler } from './auth-event'
import { useUser } from '@/hooks/userServiceHooks'

interface IProps {
  children: ReactNode
}

export default function AuthProvider({ children }: IProps) {
  const { data, isFetching } = useUser()

  const defaultValues = useMemo<userType>(
    () => ({
      publicId: '',
      email: '',
      name: '',
    }),
    [],
  )
  const queryClient = useQueryClient()

  const [user, setUser] = useState<userType>(
    Cookies.get('user')
      ? JSON.parse(Cookies.get('user') as string)
      : defaultValues,
  )
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Cookies.get('isLoggedIn') ? true : false,
  )

  const signIn = async ({ email, password }: loginType) => {
    await api.post<{ access_token: string; refresh_token: string }>(
      'auth/login',
      {
        email,
        password,
      },
    )

    setIsLoggedIn(true)
    Cookies.set('isLoggedIn', 'true')
  }

  const logoutHandler = useCallback(() => {
    queryClient.invalidateQueries()
    setUser(defaultValues)
    setIsLoggedIn(false)
    Cookies.remove('isLoggedIn')
    Cookies.remove('user')
  }, [queryClient, defaultValues])

  useEffect(() => {
    if (!isFetching) {
      if (data) {
        const { publicId, email, name } = data
        if (!Cookies.get('user')) {
          setUser({
            publicId,
            email,
            name,
          })
          Cookies.set(
            'user',
            JSON.stringify({
              publicId,
              email,
              name,
            }),
          )
        }
      }
    }
  }, [data, isFetching, isLoggedIn])

  useEffect(() => {
    setLogoutHandler(logoutHandler)
  }, [logoutHandler])

  return (
    <AuthContext.Provider value={{ user, signIn, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
