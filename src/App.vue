<template>
  <main>
    <Nav/>
    <router-view/>
  </main>
</template>

<script setup>
import Nav from "@/components/Nav";
import axios from "axios";

  axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        // if you ever get an unauthorized, logout the user
        this.$store.dispatch('AUTH_LOGOUT')
        // you can also redirect to /login if needed !
      }
      throw err;
    });
  });
</script>
