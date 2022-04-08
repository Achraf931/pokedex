<template>
  <nav class="text-4xl w-full p-10 pb-0 flex items-center justify-between">
    <div class="font-semibold flex items-center justify-between py-2.5 mr-10 w-7/12 border-t-2 border-b-2 border-black border-solid">
      <p>POKETEST</p>
      <div class="flex items-center gap-10">
        <router-link to="/" class="nav-item block">
          <span class="block">Home</span>
        </router-link>
        <router-link v-if="user.token === ''" to="/register" class="nav-item block" >
          <span class="block">Register</span>
        </router-link>
        <router-link to="/pokedex" class="nav-item block" v-else>
          <span class="block">Pokedex</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters('auth', {
      user: 'getAuthData'
    })
  }
};
</script>

<style lang="scss" scoped>
  .nav-item:hover > span {
    transform: translateY(-10px);
  }
</style>
