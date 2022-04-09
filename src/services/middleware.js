import { refresh } from '@/repositories/auth'
import store, { actionList } from '@/store'

let token = localStorage.getItem('token')
let refreshToken = localStorage.getItem('refresh_token')

const requestToken = async () => {
  if (refreshToken == null) {
    throw new Error('Attempt to refresh session without token')
  }

  token = (await refresh(refreshToken)).access
  localStorage.setItem('token', token)

  return token
}

export const setup = handler => {
  handler.interceptors.request.use(config => {
    if (token === null) {
      return config
    }

    if (typeof config.headers !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  handler.interceptors.response.use(
    config => {
      if (config.data?.access) {
        token = config.data?.access
        localStorage.setItem('token', token)
        store.dispatch(actionList.detectLoggedIn)
      }
      if (config.data?.refresh) {
        refreshToken = config.data?.refresh
        localStorage.setItem('refresh_token', refreshToken)
      }

      return config
    },

    async error => {
      if (typeof error.response === 'object') {
        const config = error.config

        if (error.response.status === 401 && !config._retry) {
          config._retry = true
          if (typeof config.headers !== 'undefined') {
            config.headers.Authorization = await requestToken()
          }

          return handler(config)
        }
      }

      return Promise.reject(error)
    }
  )
}
