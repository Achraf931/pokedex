<template>
  <div class="home">
    <input type="text" placeholder="search" @input="paginate(0)" v-model="searchInput">
    <section>
      <Pokemon @click="addPokemon(pokemon.id)" v-for="pokemon in pokedex" :key="pokemon.id" :pokemon="pokemon" />
    </section>
    <button v-if="offset > 0" type="button" @click="paginate(-50)">prev</button>
    <button v-if="hasNext !== null" type="button" @click="paginate(50)">next</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { pokedex as action } from '@/repositories/pokedex'
import Pokemon from '@/components/Pokemon'
import { add } from '@/repositories/pokemon'
import { me } from '@/repositories/auth'

const offset = ref(0)
const hasNext = ref(null)
const pokedex = ref([])
const searchInput = ref('')

const addPokemon = async id => {
  add({ pokedex_creature: id, trainer: (await me()).id })
}

const paginate = async nb => {
  const response = await action({ offset: offset.value += nb, name: searchInput.value })

  hasNext.value = response.next
  pokedex.value = response.results
}

onMounted(async () => {
  paginate(0)
})
</script>
