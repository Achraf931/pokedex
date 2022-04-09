import { get } from '@/services'

export const pokedex = async aggregation => {
  return (
    await get('pokedex/', aggregation)
  ).data
}
