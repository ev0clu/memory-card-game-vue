<script setup lang="ts">
import { RouterView } from 'vue-router'
import FooterComponent from './components/FooterComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <HeaderComponent />

  <main>
    <RouterView />
  </main>

  <Toaster richColors />
  <FooterComponent />
</template>

<style scoped>
main {
  flex-grow: 1;
  padding: 2rem 0;
}
</style>
