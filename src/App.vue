<template>
  <main class="h-screen max-w-screen w-full flex flex-col">
    <Nav/>
    <router-view/>
  </main>
</template>

<script setup>
  import Nav from "@/components/Nav";
</script>

<style>
.router-link-exact-active {
  color: rgba(255, 204, 0, .6);
  -webkit-text-stroke: .01px black;
}

main {
  background: #F3F4F2;
}

.bg-custom {
  background: rgba(255, 204, 0, .6);
}
</style>
