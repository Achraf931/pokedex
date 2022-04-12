<template>
  <p v-if="notification" @click="removeNotification" class="cursor-pointer absolute bottom-10 left-1/2 -translate-x-1/2 z-50 rounded-md shadow-md p-5 bg-red-600 text-white text-center max-w-[300px] border-2 border-solid border-black">{{ notification }}</p>
  <main class="flex flex-col h-screen w-screen">
    <MenuNavigation/>
    <router-view/>
  </main>
</template>

<script setup>
import MenuNavigation from '@/components/MenuNavigation'
import { computed } from 'vue'
import store, { actionList } from '@/store'

const notification = computed(() => store.getters.getNotification)

const removeNotification = () => store.dispatch(actionList.pushNotification, '')
</script>
