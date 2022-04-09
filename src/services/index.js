import axios from 'axios'
import { setup as setupMiddleware } from './middleware'

export const baseURL = process.env.VUE_APP_API
export const handler = axios.create({ baseURL })

setupMiddleware(handler)

export const get = async (endpoint = '', data) => {
  if (typeof data !== 'undefined') {
    endpoint = `${endpoint.replace(/\?.*$/, '')}?${new URLSearchParams(data)}`
  }

  return await handler.get(endpoint)
}

export const post = async (endpoint = '', data) => {
  await handler.post(endpoint, data)
}

export const put = async (endpoint = '', data) => {
  await handler.put(endpoint, data)
}

export const patch = async (endpoint = '', data) => {
  await handler.patch(endpoint, data)
}

export const del = async (endpoint = '', data) => {
  if (typeof data !== 'undefined') {
    endpoint = `${endpoint.replace(/\?.*$/, '')}?${new URLSearchParams(data)}`
  }

  return await handler.delete(endpoint)
}
