<script setup lang="ts">
const date = new Date().getFullYear()
</script>

<template>
  <footer>
    <p>Copyright © Laszlo Kis {{ date }}</p>
    <a href="https://github.com/ev0clu" target="_blank" rel="noreferrer">
      <img alt="Github Logo" src="@/assets/github-mark.svg" width="20" height="20" />
    </a>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem 2rem 0.75rem 2rem; /* 24px 32px 12px 32px */
  width: 100%;
}

p {
  margin: 0;
}

footer > a {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  color: #6b7280;

  &:hover {
    color: #a3a3a3;
  }
}

img {
  border-radius: 9999px;
  filter: invert(100%);
}

img:hover {
  opacity: 0.6;
}

@media (min-width: 640px) {
  footer {
    padding: 0.5rem 4rem;
  }
}
</style>
