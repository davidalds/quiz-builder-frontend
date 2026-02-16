import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { AuthContext } from './authContext'
import type { accessTokenType, loginType, userType } from './types'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { api } from '@/services'
import { useQueryClient } from '@tanstack/react-query'

interface IProps {
  children: ReactNode
}

export default function AuthProvider({ children }: IProps) {
  const [isLoggedIn, setIsLoggegIn] = useState<boolean>(false)
  const defaultValues: userType = {
    id: 0,
    email: '',
    name: '',
  }
  const queryClient = useQueryClient()

  const [user, setUser] = useState<userType>(defaultValues)

  const signIn = async ({ email, password }: loginType): Promise<string> => {
    const {
      data: { access_token },
    } = await api.post<{ access_token: string }>('auth/login', {
      email,
      password,
    })
    Cookies.set('access_token', access_token)
    setIsLoggegIn(true)
    return access_token
  }

  const signOut = () => {
    Cookies.remove('access_token')
    queryClient.invalidateQueries()
    setUser(defaultValues)
    setIsLoggegIn(false)
  }

  const decodedToken = (): accessTokenType | undefined => {
    const access_token: string | undefined = Cookies.get('access_token')
    if (access_token) {
      return jwtDecode(access_token)
    }
    return undefined
  }

  const isAuthenticated = useCallback((): boolean => {
    const access_token = decodedToken()
    if (access_token) {
      if (Date.now() <= access_token.exp * 1000) {
        return true
      }
    }
    return false
  }, [])

  useEffect(() => {
    if (isAuthenticated()) {
      setIsLoggegIn(true)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isLoggedIn) {
      const access_token = decodedToken()
      if (access_token) {
        const { id, name, email } = access_token
        setUser({ id, name, email })
      }
    }
  }, [isLoggedIn])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
