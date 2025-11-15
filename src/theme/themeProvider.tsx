import { useEffect, useState, type ReactNode } from 'react'
import { themeContext } from './themeContext'
import type { themeColor } from '@/types/theme'

interface IProps {
  children: ReactNode
}

const storageKey = 'colorTheme'

function ThemeProvider({ children }: IProps) {
  const [color, setColor] = useState<themeColor>(
    (localStorage.getItem(storageKey) as themeColor) || 'light',
  )

  const changeTheme = (t: themeColor) => {
    localStorage.setItem(storageKey, t)
    setColor(t)
  }

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (localStorage.getItem(storageKey) === null) {
      if (isDarkMode) {
        changeTheme('dark')
      } else {
        changeTheme('light')
      }
    }
  }, [])

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    body.setAttribute('class', color)
  }, [color])

  return (
    <themeContext.Provider
      value={{
        color,
        changeTheme,
      }}
    >
      {children}
    </themeContext.Provider>
  )
}

export default ThemeProvider
