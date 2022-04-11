<template>
  <div class="flex-1 flex lg:flex-col justify-between items-center overflow-hidden">
    <div class="sm:py-0 lg:w-full w-7/12 flex flex-col overflow-hidden xl:p-5 p-10 lg:h-1/2 h-full">
      <input class="xs:text-xs mb-5 w-full outline-none bg-white text-black border-2 border-solid border-black rounded-md px-5 py-2" type="text" placeholder="search" @input="paginate(0)" v-model="searchInput">
      <section class="grid grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 auto-rows-min flex-1 overflow-y-scroll overflow-x-hidden w-full gap-3">
        <Pokemon :class="{'opacity-50': selected === pokemon}" @click="openDetails(pokemon)" v-for="pokemon in pokedex" :key="pokemon.id" :pokemon="pokemon" />
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
            <p class="text-2xl">#{{ selected.id }}</p>
            <p class="text-xs text-right">{{ selected.legendary ? '' : 'Not ' }}Legendary</p>
          </div>
          <img height="200" width="200" class="mx-auto" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected.id}.png`" :alt="selected.name">
        </div>
        <article class="border-2 border-solid border-white md:w-full lg:w-1/2 p-5 lg:h-full">
          <h1 class="xs:text-xs font-bold text-center text-xl">{{ selected.name }}</h1>
          <div class="text-white grid grid-cols-2 divide-x-2 divide-white border-t-2 border-b-2 border-solid border-white items-center py-2 mt-5">
            <div class="h-full flex flex-col justify-between">
              <p class="text-[10px]">Type 1</p>
              <p class="xs:text-xs w-full text-center mx-auto font-bold">{{ selected.type_1 }}</p>
            </div>
            <div class="h-full flex flex-col justify-between">
              <p class="text-[10px] text-right">Type 2</p>
              <p class="xs:text-xs w-full text-center mx-auto font-bold">{{ selected.type_2 }}</p>
            </div>
          </div>

          <button v-if="user.id !== null" type="button" class="sm:text-sm xs:text-xs text-white button cursor-pointer w-full border-2 border-solid border-black mt-5 px-4 py-1 bg-custom hover:opacity-75" @click.prevent="addPokemon">Add to my pokedex</button>
          <div class="flex items-end justify-between lg:w-[unset] w-full text-xs mt-5 lg:mt-full">
            <p>Generation : {{ selected.generation }}</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { pokedex as action } from '@/repositories/pokedex'
import Pokemon from '@/components/Pokemon'
import { me } from '@/repositories/auth'
//  import { add } from '@/repositories/pokemon'
//  import { me } from '@/repositories/auth'

const selected = ref({})
const offset = ref(0)
const hasNext = ref(null)
const hasPrev = ref(null)
const pokedex = ref([])
const searchInput = ref('')
const user = ref({})

const openDetails = async pokemon => {
  selected.value = pokemon
}

const paginate = async nb => {
  const response = await action({ offset: offset.value += nb, name: searchInput.value })

  hasPrev.value = response.previous
  hasNext.value = response.next
  pokedex.value = response.results
  selected.value = response.results[0]
}

onMounted(async () => {
  user.value = await me()
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
