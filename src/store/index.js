import { createStore } from 'vuex'
import auth from "./modules/auth";
import pokedex from "./modules/pokedex";
import pokemon from "./modules/pokemon";

export default createStore({
  modules: {
    auth,
    pokedex,
    pokemon
  }
})
