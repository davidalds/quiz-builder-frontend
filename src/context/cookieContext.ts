import React from 'react'
import type { CookieContent } from './types'

export const cookieContext = React.createContext<CookieContent>(null!)
