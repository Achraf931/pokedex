import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('@/views/SignView.vue'),
    meta: {
      authRequired: false
    }
  },
  {
    path: '/pokemon',
    name: 'Pokemon',
    component: () => import('@/views/PokemonView.vue'),
    meta: {
      authRequired: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.getLoggedIn

  if (to.fullPath === '/') {
    return next()
  } else if (!isLoggedIn && to.meta.authRequired) {
    return next('/sign')
  } else if (isLoggedIn && to.meta.authRequired === false) {
    return next('/')
  }

  return next()
})

export default router
