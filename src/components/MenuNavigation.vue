<template>
  <nav class="sm:text-xs md:text-base text-xl w-full xl:p-5 p-10 pb-0 flex items-center justify-between">
    <div class="xs:flex-col w-full transition-all duration-150 ease-in-out font-semibold flex items-center justify-between py-2.5 border-t-2 border-b-2 border-black border-solid">
      <router-link to="/">POKETEST</router-link>
      <div class="flex items-center gap-10 sm:gap-4 xs:mt-2.5">
        <router-link to="/" class="group block">
          <span class="block group-hover:translate-y-[-10px]">Home</span>
        </router-link>
        <router-link v-if="!isLoggedIn" to="/sign" class="group block" >
          <span class="block group-hover:translate-y-[-10px]">Login/Register</span>
        </router-link>
        <template v-else>
          <router-link to="/pokemon" class="group block">
            <span class="block group-hover:translate-y-[-10px]">Pokédeck</span>
          </router-link>
          <p @click="signOut" class="group block">
            <svg class="cursor-pointer fill-current hover:text-red-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/></svg>
          </p>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import store, { actionList, mutationList } from '@/store'
import router from '@/router'

const isLoggedIn = ref(Boolean)

watch(() => store.getters.getLoggedIn, newVal => {
  store.commit(mutationList.isLoggedIn, newVal)
  isLoggedIn.value = newVal
})

onMounted(async () => {
  isLoggedIn.value = store.getters.getLoggedIn
})

const signOut = () => store.dispatch(actionList.logOut).then(() => router.push('/'))
</script>
