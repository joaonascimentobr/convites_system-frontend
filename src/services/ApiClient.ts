// src/services/ApiClient.ts
import axios from 'axios'

type ApiErrorPayload = {
  message?: string | string[]
  error?: string
}

function getApiErrorMessage(error: unknown) {
  if (!axios.isAxiosError<ApiErrorPayload>(error)) {
    return ''
  }

  const payload: unknown = error.response?.data

  if (typeof payload === 'string' && payload.trim()) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return error.code === 'ERR_NETWORK' ? 'Não foi possível conectar ao servidor.' : ''
  }

  const apiPayload = payload as ApiErrorPayload

  if (Array.isArray(apiPayload.message)) {
    return apiPayload.message.filter(Boolean).join(', ')
  }

  if (typeof apiPayload.message === 'string' && apiPayload.message.trim()) {
    return apiPayload.message
  }

  if (typeof apiPayload.error === 'string' && apiPayload.error.trim()) {
    return apiPayload.error
  }

  if (error.code === 'ERR_NETWORK') {
    return 'Não foi possível conectar ao servidor.'
  }

  return ''
}

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin)

export class ApiClient {
  private client = axios.create({ baseURL: BASE_URL })

  constructor() {
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('jwt')
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    })

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = getApiErrorMessage(error)

        if (message && axios.isAxiosError(error)) {
          error.message = message
        }

        return Promise.reject(error)
      },
    )
  }

  get<T>(url: string, params?: any) { return this.client.get<T>(url, { params }).then(r => r.data) }
  post<T>(url: string, data?: any)   { return this.client.post<T>(url, data).then(r => r.data) }
  put<T>(url: string, data?: any)    { return this.client.put<T>(url, data).then(r => r.data) }
  del<T>(url: string)                { return this.client.delete<T>(url).then(r => r.data) }
}
