<template>
  <main class="h-screen max-w-screen w-full flex flex-col">
    <Nav/>
    <router-view/>
  </main>
</template>

<script setup>
  import Nav from "@/components/Nav";
</script>

<style scoped>
main {
  background: #F3F4F2;
}
</style>
