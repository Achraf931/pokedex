<template>
  <nav class="text-xl w-full p-10 pb-0 flex items-center justify-between">
    <div :class="{'w-full': this.$route.name === 'Home' || this.$route.name === 'Register'}" class="transition-all duration-150 ease-in-out font-semibold flex items-center justify-between py-2.5 mr-10 w-7/12 border-t-2 border-b-2 border-black border-solid">
      <p>POKETEST</p>
      <div class="flex items-center gap-10">
        <router-link to="/" class="group block">
          <span class="block group-hover:translate-y-[-10px]">Home</span>
        </router-link>
        <router-link to="/register" class="group block" >
          <span class="block group-hover:translate-y-[-10px]">Register</span>
        </router-link>
        <template>
          <router-link to="/pokemons" class="group block">
            <span class="block group-hover:translate-y-[-10px]">Pokemons</span>
          </router-link>
          <router-link to="/pokedex" class="group block">
            <span class="block group-hover:translate-y-[-10px]">Pokedex</span>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>

</script>
