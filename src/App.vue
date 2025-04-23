<script setup lang="ts">
import { RouterView } from 'vue-router'
import FooterComponent from './components/FooterComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent />

  <main>
    <RouterView />
  </main>

  <FooterComponent />
</template>

<style scoped>
main {
  flex-grow: 1;
  padding: 2rem 0;
}
</style>
