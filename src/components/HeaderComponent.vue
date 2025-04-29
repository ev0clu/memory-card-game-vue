<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/">
      <img alt="Logo" class="logo" src="@/assets/logo.png" width="35" height="35" />
    </RouterLink>

    <nav>
      <RouterLink to="/">HOME</RouterLink>
      <RouterLink to="/score">SCORES</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 1.5;
}

.logo {
  display: block;
}

nav {
  font-size: 1rem;
  font-weight: 900;
  text-align: center;
}

nav a {
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: var(--pico-color-red-350);
  text-decoration: underline;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}
</style>
