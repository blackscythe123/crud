import axios from 'axios'
import { useToastStore } from '../stores/toastStore'

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer test-token'
    console.log(config.method.toUpperCase(), config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (res) => {
    const toastStore = useToastStore()
    toastStore.show('Request Succeeded: ' + res.config.method.toUpperCase(), 'success')
    return res
  },
  (err) => {
    const toastStore = useToastStore()
    toastStore.show('API Error: ' + (err.response?.data?.message || err.message), 'error')
    return Promise.reject(err)
  }
)

export default api
