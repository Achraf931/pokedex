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
  color: #FFCB02;
  -webkit-text-stroke: .01px black;
}

main {
  background: #F3F4F2;
}

.bg-custom {
  background: #FFCB02;
}

.bg-custom-blue {
  background: #2E6FB5;
}
</style>
