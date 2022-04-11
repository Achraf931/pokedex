import { get, post, put, patch, del } from '@/services'

export const pokemons = async aggregation => {
  try {
    return (
      await get('pokemon/', aggregation)
    ).data
  } catch (e) {
    console.log(e)
  }
}

export const add = async pokemon => {
  try {
    return (
      await post('pokemon/', pokemon)
    ).data
  } catch (e) {
    console.log(e)
  }
}

export const update = async pokemon => {
  try {
    return (
      await put(`pokemon/${pokemon.id}/`, pokemon)
    ).data
  } catch (e) {
    console.log(e)
  }
}

export const partialUpdate = async pokemon => {
  try {
    return (
      await patch(`pokemon/${pokemon.id}/`, pokemon)
    ).data
  } catch (e) {
    console.log(e)
  }
}

export const remove = async id => {
  try {
    await del(`pokemon/${id}/`)
  } catch (e) {
    console.log(e)
  }
}

export const giveXP = async (id, amount) => {
  try {
    return (
      await post(`pokemon/${id}/give_xp/`, { amount })
    )
  } catch (e) {
    console.log(e)
  }
}
