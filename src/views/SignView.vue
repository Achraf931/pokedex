<template>
  <form @submit.prevent="login">
    <input type="text" placeholder="username" v-model="username">
    <input type="password" placeholder="password" v-model="password">
    <button type="submit">send</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { login as action } from '@/repositories/auth'
import router from '@/router'

const username = ref('')
const password = ref('')

const login = async () => {
  const response = await action({
    username: username.value,
    password: password.value
  })

  if (response.access) {
    console.log('yes')
    router.push('/')
  }
}
</script>
