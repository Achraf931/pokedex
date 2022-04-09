<template>
  <article>
    <img height="96" width="96" loading="lazy" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedex_creature?? pokemon.id}.png`" :alt="pokemon.name">
    <p>{{ nickname?? pokemon.name }}</p>
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
  pokedex_creature: {
    type: Number,
    required: false
  }
})
</script>
