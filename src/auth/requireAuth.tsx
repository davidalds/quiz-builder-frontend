import { useEffect, type ReactNode } from 'react'
import { useAuth } from './useAuth'
import { Navigate, useLocation } from 'react-router'
import { useUser } from '@/hooks/userServiceHooks'
import { logout } from './auth-event'

interface IProps {
  children: ReactNode
}

const RequireAuth = ({ children }: IProps) => {
  const { isError, isFetching } = useUser()
  const auth = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (!isFetching) {
      if (isError) logout()
    }
  }, [isError, isFetching])

  if (!auth.isLoggedIn) {
    return (
      <Navigate
        to={{ pathname: '/login', search: `?redirect=${location.pathname}` }}
        state={{ from: location }}
        replace={true}
      />
    )
  }

  return children
}

export default RequireAuth
