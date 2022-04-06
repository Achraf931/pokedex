import { createStore } from 'vuex'
import auth from "./modules/auth";
import pokedex from "./modules/pokedex";

export default createStore({
  modules: {
    auth,
    pokedex
  }
})
