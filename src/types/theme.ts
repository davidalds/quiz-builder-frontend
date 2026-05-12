export type themeColor = 'light' | 'dark'

export type btnColors =
  | 'link'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'

export interface Theme {
  color: themeColor
  changeTheme: (t: themeColor) => void
}
