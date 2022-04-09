<template>
  <nav class="text-xl w-full p-10 pb-0 flex items-center justify-between">
    <div :class="{'w-full': this.$route.name === 'Home' || this.$route.name === 'Register'}" class="transition-all duration-150 ease-in-out font-semibold flex items-center justify-between py-2.5 mr-10 w-7/12 border-t-2 border-b-2 border-black border-solid">
      <p>POKETEST</p>
      <div class="flex items-center gap-10">
        <router-link to="/" class="group block">
          <span class="block group-hover:translate-y-[-10px]">Home</span>
        </router-link>
        <router-link v-if="!user.id" to="/sign" class="group block" >
          <span class="block group-hover:translate-y-[-10px]">Register</span>
        </router-link>
        <router-link v-else to="/pokemon" class="group block">
          <span class="block group-hover:translate-y-[-10px]">Pokédeck</span>
        </router-link>
        <p @click="signOut" class="group block">
          <span class="block group-hover:translate-y-[-10px]">Deco</span>
        </p>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { me } from '@/repositories/auth'
import { ref, onMounted } from 'vue'
import store, { actionList } from '@/store'
import router from '@/router'

const user = ref({})

onMounted(async () => {
  user.value = await me()
})

const signOut = () => store.dispatch(actionList.logOut).then(() => router.push('/'))
</script>
