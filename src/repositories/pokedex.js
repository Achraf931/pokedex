import { get } from '@/services'

export const pokedex = async aggregation => {
  try {
    return (
      await get('pokedex/', aggregation)
    ).data
  } catch (e) {
    console.log(e)
  }
}

export const getPokemon = async id => {
  try {
    return (
      await get(`pokedex/${id}`)
    ).data
  } catch (e) {
    console.log(e)
  }
}
