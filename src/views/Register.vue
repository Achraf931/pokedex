<template>
  <form @submit.prevent="register">
    <input v-model="form.username" type="text" placeholder="username">
    <input v-model="form.email" type="email" placeholder="email">
    <input v-model="form.password" type="password" placeholder="password">
    <button type="submit">register</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { reactive } from "vue";

export default {
  name: 'Register',
  setup() {
    const form = reactive({
      username: '',
      email: '',
      password: ''
    })

    return {
      form
    };
  },
  computed: {
    ...mapGetters('auth', {
      gettersLoginApiStatus: 'getLoginStatus'
    })
  },
  methods: {
    ...mapActions('auth', {
      actionRegister: 'register'
    }),
    async register() {
      await this.actionRegister(this.form)
      if (this.gettersLoginApiStatus === 'success') {
        this.$router.push('/pokedex')
      }
      else {
        alert('failed to login')
      }
    }
  }
}
</script>
