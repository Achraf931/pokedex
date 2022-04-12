import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PokemonView from '@/views/PokemonView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('@/views/SignView.vue'),
    meta: {
      title: 'Sign Page',
      authRequired: false
    }
  },
  {
    path: '/pokemon',
    name: 'Pokemon',
    component: PokemonView,
    meta: {
      title: 'Pokédeck',
      authRequired: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title

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
