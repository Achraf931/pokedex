<template>
  <div class="pokemon border-2 border-black border-solid cursor-pointer">
    <img class="mx-auto" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" :alt="pokemon.name">
    <div>
      <p class="font-semibold text-2xl text-center">{{ pokemon.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  }
}
</script>
