<template>
  <div class="flex-1 w-full pt-10 flex justify-between overflow-hidden">
    <div class="w-7/12 flex flex-col overflow-hidden p-10 pt-0 pr-0 mr-10">
      <h1 class="text-7xl text-center">Attrapez-les tous !</h1>

      <div v-if="getterPokedex?.results?.length > 0" class="grid grid-cols-3 gap-6 mt-3 pt-5 pb-2 px-2 overflow-scroll flex-1">
        <div @click="selector(pokemon)" :class="{'selected': selected === pokemon}" class="pokemon border-2 border-black border-solid cursor-pointer" v-for="pokemon in getterPokedex.results" :key="pokemon.id">
          <img class="mx-auto" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" :alt="pokemon.name">
          <div>
            <p class="font-semibold text-2xl text-center">{{ pokemon.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selected" class="bg-gradient-to-r from-cyan-500 to-blue-500 p-10 pt-0 flex-1 h-screen absolute top-0 right-0 w-2/5">
      <img class="mx-auto w-4/5" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected.id}.png`" :alt="selected.name">
      <article class="border-2 border-solid border-black p-5">
        <h1 class="font-bold text-center text-6xl">{{ selected.name }}</h1>
        <button type="button" @click.prevent="giveXp">Give EXP</button>
      </article>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      selected: {}
    }
  },
  computed: {
    ...mapGetters("pokedex", {
      getterPokedex: "getPokedex"
    })
  },
  methods: {
    ...mapActions('pokemon', {
      actionNew: 'newPokemon'
    }),
    ...mapActions('pokedex', {
      actionGet: 'pokedex'
    }),
    selector(pokemon, giveXp = null) {
      this.startSong()
      this.selected = pokemon
      this.actionNew({pokedex_creature: pokemon.id})
    },
    giveXp() {
      this.startSong(true)
    },
    startSong(giveXp = false) {
      let song1 = giveXp ? new Audio('/songs/mixkit-arcade-game-jump-coin-216.mp3') : new Audio('/songs/mixkit-retro-arcade-casino-notification-211.mp3')
      song1.play()
    }
  },
  mounted() {
    this.actionGet().then(() => this.selected = this.getterPokedex.results.length > 0 ? this.getterPokedex.results[0] : {})
  }
};
</script>

<style lang="scss" scoped>
.pokemon:hover, .selected {
  transform: translate(-5px, -5px);
  box-shadow: 5px 5px black;
}
</style>
