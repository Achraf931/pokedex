<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="user" to="/pokedex">Pokedex</router-link>
    <router-link v-else to="/register">Register</router-link>
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
