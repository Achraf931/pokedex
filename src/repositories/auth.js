import { get, post } from '@/services'
import { PartialCredError, RefreshError } from '@/repositories/errors/auth'

export const register = async (user) => {
  try {
    await post('api/users/register/', user)
    return (
      await post('api/token/', { username: user.username, password: user.password })
    ).data
  } catch (e) {
    if (e.response.status === 500) {
      throw new Error('This account already exists!')
    } else {
      throw new PartialCredError(e.response.data)
    }
  }
}

export const login = async (credentials) => {
  try {
    return (
      await post('api/token/', credentials)
    ).data
  } catch (e) {
    throw new PartialCredError(e.response.data)
  }
}

export const refresh = async (refresh) => {
  try {
    return (
      await post('api/token/refresh/', { refresh })
    ).data
  } catch (e) {
    throw new RefreshError()
  }
}

export const me = async () => {
  return (
    await get('api/users/me')
  ).data
}
