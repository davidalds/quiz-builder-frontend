export type themeColor = 'light' | 'dark'

export interface Theme {
  color: themeColor
  changeTheme: (t: themeColor) => void
}
