import { get, post, put, patch, del } from '@/services'

export const pokemons = async aggregation => {
  return (
    await get('pokemon/', aggregation)
  ).data
}

export const add = async pokemon => {
  return (
    await post('pokemon/', pokemon)
  ).data
}

export const update = async pokemon => {
  return (
    await put(`pokemon/${pokemon.id}/`, pokemon)
  ).data
}

export const partialUpdate = async pokemon => {
  return (
    await patch(`pokemon/${pokemon.id}/`, pokemon)
  ).data
}

export const remove = async id => {
  await del(`pokemon/${id}/`)
}

export const giveXP = async (id, amount) => {
  return (
    await post(`pokemon/${id}/`, amount)
  )
}
