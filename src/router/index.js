import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Pokedex from '../views/Pokedex.vue'
import store from "@/store";
import axios from "axios";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiredAuth: false
    }
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

  if (to.fullPath == "/") {
    return next();
  } else if (auth && !to.meta.requiredAuth) {
    return next({ path: "/pokedex" });
  } else if (!auth && to.meta.requiredAuth) {
    return next({ path: "/register" });
  }

  return next();
});
