import { get, post } from '@/services'
import { PartialCredError, RefreshError } from '@/repositories/errors/auth'

export const register = async (user) => {
  try {
    return (
      await post('api/users/register/', user)
    ).data
  } catch (e) {
    throw new PartialCredError(e.response.data)
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
