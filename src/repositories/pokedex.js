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
