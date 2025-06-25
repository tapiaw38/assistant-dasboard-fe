import axios from 'axios'
import type { AxiosInstance } from 'axios'

type ServerParams = {
  timeout?: number
  baseURL?: string
}

export const server = ({ timeout, baseURL }: ServerParams): AxiosInstance => {
  const instance = axios.create({
    timeout: timeout || 5000,
    baseURL: baseURL,
  })

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `bearer ${token}`
    }
    return config
  })

  return instance
}
