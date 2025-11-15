export type themeColor = 'light' | 'dark'

export type theme = {
  color: themeColor
  changeTheme: (t: themeColor) => void
}
