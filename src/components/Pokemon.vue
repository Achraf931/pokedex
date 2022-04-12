<template>
  <article class="select-none cursor-pointer flex flex-col border-2 border-solid border-black rounded-lg">
    <div class="h-[112px] border-8 rounded-md border-solid border-white bg-yellow-200">
      <img v-if="ref_number" class="snap-center select-none mx-auto" height="96" width="96" loading="lazy" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ref_number}.png`" :alt="pokemon.name">
    </div>
    <p class="text-center text-xs flex items-center justify-center p-2 flex-1 bg-red-400 text-white rounded-bl-md rounded-br-md">{{ nickname?? pokemon.name }}</p>
  </article>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  pokemon: {
    type: Object,
    required: true
  },
  nickname: {
    type: String,
    required: false
  },
  ref_number: {
    type: Number,
    required: false
  }
})
</script>

<style scoped>
article:active {
  transform: scale(.95);
}
</style>
