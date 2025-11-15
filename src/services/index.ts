import Axios from 'axios'

export const api = Axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:8080/'
      : 'http://localhost:8080/',
})
