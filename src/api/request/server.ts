import axios from 'axios'
import type { AxiosInstance } from 'axios'

type ServerParams = {
  timeout?: number
  baseURL?: string
}

export const server = ({ timeout, baseURL }: ServerParams): AxiosInstance =>
  axios.create({
    timeout: timeout || 5000,
    baseURL: baseURL,
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
  })
