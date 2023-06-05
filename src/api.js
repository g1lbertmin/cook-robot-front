import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8888',
  timeout: 5000,
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { api }
