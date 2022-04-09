<template>
  <p>pokedex view</p>
  <input type="text" placeholder="search" @input="paginate(0)" v-model="searchInput">
  <Pokemon v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" :nickname="pokemon.nickname" :pokedex_creature="pokemon.pokedex_creature" />
</template>

<script setup>
import Pokemon from '@/components/Pokemon'
import { onMounted, ref } from 'vue'
import { pokemons as action } from '@/repositories/pokemon'
import { me } from '@/repositories/auth'
// import { giveXP } from '@/repositories/pokemon'

/* const giveXp = ({ id, amount }) => {
  giveXP(id, amount)
} */

const offset = ref(0)
const hasNext = ref(null)
const pokemons = ref([])
const searchInput = ref('')

const paginate = async nb => {
  const response = await action({ trainer: (await me()).id, offset: offset.value += nb, name: searchInput.value })

  hasNext.value = response.next
  pokemons.value = response.results
  console.log(pokemons.value)
}

onMounted(async () => {
  paginate(0)
})
</script>
