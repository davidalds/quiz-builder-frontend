import Axios from 'axios'
import Cookies from 'js-cookie'

const api = Axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://quiz-builder-backend-production.up.railway.app/'
      : 'http://localhost:8080/',
})

api.interceptors.request.use(
  (config) => {
    const accessToken: string | undefined = Cookies.get('access_token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

export { api }
