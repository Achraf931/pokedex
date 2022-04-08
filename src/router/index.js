import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Pokemons from '@/views/Pokemons.vue'
import Pokedex from '@/views/Pokedex.vue'
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiredAuth: false
    }
  },
  {
    path: '/pokemons',
    name: 'Pokemons',
    component: Pokemons,
    meta: {
      requiredAuth: false
    }
  },
  {
    path: '/pokedex',
    name: 'Pokedex',
    component: Pokedex,
    meta: {
      requiredAuth: true
    }
  },
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const exp = localStorage.getItem('exp')?? 0,
      currentDate = new Date() / 1;

  if (exp === 0 || exp >= currentDate) localStorage.clear();

  const auth = store.getters["auth/isTokenActive"];

  if (!auth && to.meta.requiredAuth) return next({ name: "Register" });

  return next();
});
