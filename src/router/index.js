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
      authRequired: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      authRequired: false
    }
  },
  {
    path: '/pokedex',
    name: 'Pokedex',
    component: Pokedex,
    meta: {
      authRequired: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authData = store.getters["auth/getAuthData"];

  if (!authData.token) {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (access_token) {
      authData.token = access_token
      authData.refreshToken = refresh_token

      store.commit("auth/saveTokenData", authData);
    }
  }
 let auth = store.getters["auth/isTokenActive"];

   if (!auth) {
     if (authData.token) {
       const refreshResponse = await axios({
         method: 'POST',
         url: `https://cors-anywhere.herokuapp.com/https://pokedexbe-akd7k.dev.simco.io/api/token/refresh/`,
         data: {refresh: authData.refreshToken},
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Content-type': 'application/json',
         }
       });
       authData.token = refreshResponse.data.access
       store.commit("auth/saveTokenData", authData);
       auth = true;
     }
   }

  if (to.fullPath == "/") {
    return next();
  } else if (auth && to.meta.requiredAuth) {
    return next({ path: "/pokedex" });
  } else if (!auth && to.meta.requiredAuth) {
    return next({ path: "/register" });
  }

  return next();
});

export default router
