export type userType = {
  publicId: string
  email: string
  name: string
}

export type loginType = {
  email: string
  password: string
}

export type AuthTokenType = {
  id: number
  publicId: string
  email: string
  name: string
  exp: number
}

export type authType = {
  user: userType
  signIn: (data: loginType) => Promise<void>
  logout: () => void
  isLoggedIn: boolean
}
