export type userType = {
  id: number
  email: string
  name: string
}

export type loginType = {
  email: string
  password: string
}

export type accessTokenType = {
  id: number
  email: string
  name: string
  exp: number
}

export type authType = {
  user: userType
  signIn: (data: loginType) => void
  signOut: () => void
  isAuthenticated: () => boolean
}
