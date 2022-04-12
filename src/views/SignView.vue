<template>
  <section class="sm:text-xs p-10 flex-1 flex flex-col items-center justify-center text-white my-0 mx-auto p-5 w-full max-w-screen relative">
    <q class="text-black mb-10 text-center">Avez-vous toujours besoin d’une raison pour aider quelqu’un ?</q>

    <div class="flex items-center text-center justify-between rounded-tl-md rounded-tr-md bg-red-600 border-2 border-solid border-black border-b-0 w-full max-w-[480px]">
      <button type="button" @click="toggleMode('register')" :class="{'bg-red-800 border-b-2 border-r-2 rounded-br-md': mode !== 'register'}" class="cursor-pointer w-1/2 px-10 sm:px-5 rounded-bl-md py-5 flex-1 border-solid border-black">Register</button>
      <button type="button" @click="toggleMode('login')" :class="{'bg-red-800 border-b-2 border-l-2 rounded-bl-md': mode !== 'login'}" class="cursor-pointer w-1/2 px-10 sm:px-5 py-5 flex-1 border-solid border-black">Login</button>
    </div>
    <form @submit.prevent="sign" class="p-10 max-w-[480px] w-full bg-red-600 rounded-bl-md rounded-br-md flex flex-col gap-10 shadow-[inset_0_-1.5rem_0_0_#89061c,inset_0_-1.7rem_0_0_#000A] border-2 border-solid border-black border-t-0">
      <div>
        <label for="username">Username</label>
        <input id="username" inputmode="text" type="text" v-model="username"/>
      </div>

      <template v-if="mode === 'register'">
        <div>
          <label for="email">Email</label>
          <input id="email" inputmode="email" type="email" v-model="email"/>
        </div>
      </template>

      <div>
        <label for="password">Password</label>
        <input id="password" inputmode="text" type="password" v-model="password"/>
      </div>

      <button type="submit" class="button">
        {{ mode === 'register' ? 'Register' : 'Login' }}
      </button>
    </form>

    <p class="text-black mt-5 text-center" v-if="error !== ''">{{ error }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { login, register } from '@/repositories/auth'
import router from '@/router'
import store, { mutationList } from '@/store'

const mode = ref('register')
const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const toggleMode = item => {
  mode.value = item
  error.value = ''
}

const sign = async () => {
  let response

  try {
    if (mode.value === 'register') {
      response = await register({
        username: username.value,
        email: email.value,
        password: password.value
      })
    } else {
      response = await login({
        username: username.value,
        password: password.value
      })
    }

    if (response.access) {
      error.value = ''
      await store.commit(mutationList.isLoggedIn, true)
      router.push('/pokemon')
    }
  } catch (e) {
    error.value = e.message
  }
}
</script>

<style lang="scss" scoped>
input {
  @apply w-full outline-none bg-green-600 text-black border-2 border-solid border-black rounded-md px-5 py-2;
}

</style>
