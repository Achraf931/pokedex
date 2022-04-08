<template>
  <div class="flex-1 w-full pt-10 flex justify-between overflow-hidden">
    <div class="w-7/12 flex flex-col overflow-hidden p-10 py-0 pr-0 mr-10">
      <h1 class="text-7xl text-center">Attrapez-les tous !</h1>

      <div v-if="getterPokedex?.results?.length > 0" class="grid grid-cols-3 gap-6 mt-3 pt-5 pb-2 px-2 overflow-scroll flex-1">
          <div @click="selector(pokemon)" :class="{'selected': selected === pokemon}" class="pokemon border-2 border-black border-solid cursor-pointer" v-for="pokemon in getterPokedex.results" :key="pokemon.id">
            <img class="mx-auto" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" :alt="pokemon.name">
            <div>
              <p class="font-semibold text-2xl text-center">{{ pokemon.name }}</p>
            </div>
          </div>
      </div>

      <div class="w-full py-5 flex items-center justify-between">
        <button type="button" class="prev cursor-pointer border-2 border-solid border-black px-4 py-1 bg-custom hover:opacity-75" v-if="getterPokedex?.previous" @click="pagination(getterPokedex?.previous)">prev</button>
        <button type="button" class="next ml-auto cursor-pointer border-2 border-solid border-black px-4 py-1 bg-custom hover:opacity-75" v-if="getterPokedex?.next" @click="pagination(getterPokedex?.next)">next</button>
      </div>
    </div>

    <div v-if="selected" class="bg-custom p-10 pt-0 flex-1 h-screen absolute top-0 right-0 w-2/5">
      <p class="absolute top-10 left-10 text-7xl">{{ selected.id }}</p>
      <img class="mx-auto w-4/5" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected.id}.png`" :alt="selected.name">
      <article class="border-2 border-solid border-black p-5">
        <h1 class="font-bold text-center text-6xl">{{ selected.name }}</h1>
        <div class="grid grid-cols-2 divide-x-2 divide-black border-t-2 border-b-2 border-solid border-black items-center my-5">
          <div class="h-full flex flex-col justify-between">
            <p class="text-sm">Type 1</p>
            <p class="w-full text-center mx-auto font-bold text-3xl">{{ selected.type_1 }}</p>
          </div>
          <div class="h-full flex flex-col justify-between">
            <p class="text-sm text-right">Type 2</p>
            <p class="w-full text-center mx-auto font-bold text-3xl">{{ selected.type_2 }}</p>
          </div>
        </div>

        <div class="flex justify-between items-end">
          <p :class="{'line-through': !selected.legendary }">Legendary</p>
          <button type="button" class="cursor-pointer border-2 border-solid border-black px-4 py-1 bg-custom hover:opacity-75" @click.prevent="addPokemon">Add to my pokedex</button>
        </div>
<!--
          <button type="button" class="ml-auto cursor-pointer border-2 border-solid border-black px-4 py-1 bg-custom hover:opacity-75" @click.prevent="giveXp">Give EXP</button>
-->
      </article>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      selected: null
    }
  },
  computed: {
    ...mapGetters("pokedex", {
      getterPokedex: "getPokedex"
    }),
    ...mapGetters("auth", {
      user: "getAuthData"
    })
  },
  methods: {
    ...mapActions('pokemon', {
      actionNew: 'newPokemon'
    }),
    ...mapActions('pokedex', {
      actionGet: 'pokedex',
      paginate: 'paginate'
    }),
    pagination(direction) {
      this.paginate(direction)
    },
    selector(pokemon, giveXp = null) {
      let song = new Audio('/songs/mixkit-arcade-game-jump-coin-216.mp3');
      song.play();
      this.selected = pokemon
    },
    giveXp() {
      let song1 = new Audio('/songs/click.mp3');
      song1.play()
    },
    addPokemon() {
      let song = new Audio('/songs/alert-add.mp3');
      song.play();
      this.actionNew({trainer: this.user.id, pokedex_creature: this.selected.id})
    },
    startSong(giveXp = false) {
      //  let song1 = giveXp ? new Audio('/songs/click.mp3') : new Audio('/songs/alert-add.mp3')
      let song = new Audio('/songs/')
      song.play()
    }
  },
  mounted() {
    this.actionGet().then(() => this.selected = this.getterPokedex.results.length > 0 ? this.getterPokedex.results[0] : null)
  }
};
</script>

<style lang="scss" scoped>
.pokemon:hover, .selected {
  transform: translate(-5px, -5px);
  box-shadow: 5px 5px black;
}

button:active {
  transform: scale(.95);
}
</style>
