<template>
  <div>
    <h1>Pokedex</h1>
    <template v-if="gettersAuthData">
      <p>{{ gettersAuthData.username }}</p>
      <p>{{ gettersAuthData.email }}</p>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    return {
      // access a state in computed function
      gettersAuthData: computed(() => store.getters["auth/getAuthData"])
    }
  },
  mounted() {
    console.log(this.gettersAuthData)
  }
}
</script>
