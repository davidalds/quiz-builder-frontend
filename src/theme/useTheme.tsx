import { useContext } from 'react'
import { themeContext } from './themeContext'

export const useTheme = () => useContext(themeContext)
