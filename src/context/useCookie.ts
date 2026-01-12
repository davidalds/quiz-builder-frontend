import { useContext } from 'react'
import { cookieContext } from './cookieContext'

export const useCookie = () => useContext(cookieContext)
