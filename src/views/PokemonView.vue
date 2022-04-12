<template>
  <div class="flex-1 flex lg:flex-col justify-between items-center overflow-hidden">
    <div class="sm:py-0 lg:w-full w-7/12 flex flex-col overflow-hidden xl:p-5 p-10 lg:h-1/2 h-full">
      <input class="xs:text-xs mb-5 w-full outline-none bg-white text-black border-2 border-solid border-black rounded-md px-5 py-2" type="text" placeholder="search" @input="search" v-model="searchInput">
      <section class="relative snap-y grid grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 auto-rows-min flex-1 overflow-y-scroll overflow-x-hidden w-full gap-3">
        <template v-if="pokemons?.results?.length > 0">
          <Pokemon :class="{'opacity-50': selected === pokemon}" @click="openDetails(pokemon)" v-for="pokemon in pokemons.results" :key="pokemon.id" :pokemon="pokemon" />
        </template>
        <img v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="/img/jolteon-pokemon.gif" alt="Loader">
      </section>
      <div class="flex items-center justify-between mt-5 w-full">
        <button class="xs:text-xs button" v-if="hasPrev !== null" type="button" @click="paginate(-50)">prev</button>
        <button class="xs:text-xs ml-auto button" v-if="hasNext !== null" type="button" @click="paginate(50)">next</button>
      </div>
    </div>

    <div v-if="selected" class="text-white xl:p-5 p-10 lg:w-full lg:h-1/2 w-2/5 h-full flex flex-col justify-around">
      <div class="md:overflow-y-scroll sm:p-5 bg-red-400 lg:gap-5 flex md:flex-col lg:flex-row lg:items-start flex-col justify-between h-full rounded-md border-2 border-solid border-black p-10">
        <div class="lg:w-1/2 md:w-full">
          <div class="flex items-start justify-between">
            <p class="text-2xl">#{{ selected.pokedex_creature }}</p>
            <p class="text-xs text-right">{{ selected.legendary ? '' : 'Not ' }}Legendary</p>
          </div>
          <img v-if="selected.ref_number" height="200" width="200" class="mx-auto" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected.ref_number}.png`" :alt="selected.name">
        </div>
        <article class="border-2 border-solid border-white md:w-full lg:w-1/2 p-5 lg:h-full">
          <h1 class="xs:text-xs font-bold text-center text-xl">{{ selected.nickname?? selected.name }}</h1>
          <div class="text-white grid grid-cols-2 divide-x-2 divide-white border-t-2 border-b-2 border-solid border-white items-center py-2 mt-5">
            <div class="h-full flex flex-col justify-between">
              <p class="text-[10px]">Level</p>
              <p class="xs:text-xs w-full text-center mx-auto font-bold">{{ selected.level }}</p>
            </div>
            <div class="h-full flex flex-col justify-between">
              <p class="text-[10px] text-right">XP</p>
              <p class="xs:text-xs w-full text-center mx-auto font-bold">{{ selected.experience }}</p>
            </div>
          </div>

          <template v-if="user.id !== null">
            <button type="button" class="sm:text-sm xs:text-xs text-white button cursor-pointer w-full border-2 border-solid border-black mt-5 px-4 py-1 bg-custom hover:opacity-75" @click.prevent="giveXp({ id: selected.id })">Give XP</button>
            <button type="button" class="sm:text-sm xs:text-xs text-white button cursor-pointer w-full border-2 border-solid border-black mt-1 px-4 py-1 !bg-red-600 hover:opacity-75" @click.prevent="removePokemon({ id: selected.id })">Delete</button>
          </template>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import Pokemon from '@/components/Pokemon'
import { onMounted, ref } from 'vue'
import { pokemons as action, giveXP, remove } from '@/repositories/pokemon'
import { getPokemon as getFromPokedex } from '@/repositories/pokedex'
import { me } from '@/repositories/auth'

const selected = ref({})
const offset = ref(0)
const hasNext = ref(null)
const hasPrev = ref(null)
const pokemons = ref([])
const searchInput = ref('')
const user = ref({})

const giveXp = async ({ id, amount = 100 }) => {
  selected.value = (await giveXP(id, amount)).data
  selected.value.ref_number = (await getFromPokedex(selected.value.pokedex_creature)).ref_number
}

const removePokemon = async ({ id }) => {
  await remove(id)
  pokemons.value.results = pokemons.value.results.filter(pokemon => pokemon.id !== id)
  selected.value = pokemons.value.results[0]
}

const openDetails = async pokemon => {
  selected.value = pokemon
}

const search = () => {
  offset.value = 0
  paginate(0)
}

const paginate = async nb => {
  const response = await action({ trainer: (await me()).id, offset: offset.value += nb, name: searchInput.value })

  for (const item of response.results) {
    item.ref_number = (await getFromPokedex(item.pokedex_creature)).ref_number
  }

  pokemons.value = response

  if (pokemons.value.count > 0) {
    hasPrev.value = pokemons.value.previous
    hasNext.value = pokemons.value.next
    selected.value = pokemons.value.results[0]
  }
}

onMounted(async () => {
  paginate(0)
})
</script>

<style scoped>
section {
  scrollbar-width: none;
}

section::-webkit-scrollbar {
  display: none;
}
</style>
