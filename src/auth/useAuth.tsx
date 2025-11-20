import { useContext } from 'react'
import { AuthContext } from './authContext'

export function useAuth() {
  const auth = useContext(AuthContext)
  return auth
}
