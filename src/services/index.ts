import { logout } from '@/auth/auth-event'
import Axios from 'axios'

const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const config = error.config

    if (
      error.response?.status === 401 &&
      !config._retry &&
      config.url !== 'auth/refresh'
    ) {
      config._retry = true
      try {
        await api.post<{ access_token: string; refresh_token: string }>(
          'auth/refresh',
        )

        return api(config)
      } catch {
        logout()
      }
    }
    return Promise.reject(error)
  },
)

export { api }
