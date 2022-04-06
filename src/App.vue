<template>
  <main class="bg-yellow-300 h-screen max-w-screen w-full">
    <Nav/>
    <router-view/>
  </main>
</template>

<script setup>
  import Nav from "@/components/Nav";
</script>
