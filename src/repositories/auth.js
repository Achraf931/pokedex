import { get, post } from '@/services'

export const register = async (user) => {
  return (
    await post('api/users/register/', user)
  ).data
}

export const login = async (credentials) => {
  return (
    await post('api/token/', credentials)
  ).data
}

export const refresh = async (refresh) => {
  return (
    await post('api/token/refresh/', refresh)
  ).data
}

export const me = async () => {
  return (
    await get('api/users/me')
  ).data
}
