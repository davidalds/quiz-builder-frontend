import { api } from '@/services'

type LogoutHandler = () => void

let logoutHandler: LogoutHandler | null = null

export function setLogoutHandler(handler: LogoutHandler) {
  logoutHandler = handler
}

export function logout() {
  api
    .post('auth/logout')
    .then(() => logoutHandler?.())
    .catch((err) => new Error(err))
}
