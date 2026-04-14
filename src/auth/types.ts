export type userType = {
  publicId: string
  email: string
  nome: string
}

export type loginType = {
  email: string
  password: string
}

export type accessTokenType = {
  id: number
  publicId: string
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
