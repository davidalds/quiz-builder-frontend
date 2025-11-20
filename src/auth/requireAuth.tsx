import type { ReactNode } from 'react'
import { useAuth } from './useAuth'
import { Navigate, useLocation } from 'react-router'

interface IProps {
  children: ReactNode
}

const RequireAuth = ({ children }: IProps) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.isAuthenticated()) {
    return <Navigate to={'/login'} state={{ from: location }} replace={true} />
  }

  return children
}

export default RequireAuth
