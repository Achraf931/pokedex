<template>
  <div>
    <h1>Pokedex</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters("pokedex", {
      getterPokedex: "getPokedex",
    })
  },
  methods: {
    ...mapActions('pokedex', {
      actionGet: 'pokedex'
    })
  },
  mounted() {
    this.actionGet().then(() => {
      console.log(this.getterPokedex)
    })
  }
};
</script>
