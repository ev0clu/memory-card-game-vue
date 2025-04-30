<script setup lang="ts">
import type { Pokemon } from '@/types'
import { computed } from 'vue'

const props = defineProps<{ pokemon: Pokemon; pokemonPairs: Pokemon[] }>()
const emits = defineEmits<{
  select: [pokemon: Pokemon]
}>()

function cardClickHandler() {
  emits('select', props.pokemon)
}

const isSelected = computed(() => props.pokemonPairs.some((item) => item.uid === props.pokemon.uid))
const isFound = computed(() => props.pokemon.isFound)
</script>

<template>
  <button
    :class="[{ selected: isSelected }]"
    @click="cardClickHandler"
    :disabled="isSelected || isFound || props.pokemonPairs.length === 2"
  >
    <img
      v-if="isSelected || isFound"
      :alt="pokemon.name"
      class="card-img"
      :src="pokemon.imageUrl"
      width="100"
      height="100"
    />
    <img v-else alt="ball logo" class="card-img" src="@/assets/logo.png" width="100" height="100" />
    <p v-if="isSelected || isFound">{{ pokemon.name }}</p>
  </button>
</template>

<style scoped>
button {
  height: 200px;
  width: 150px;
  cursor: pointer;
}

button.selected {
  border: 1px solid var(--pico-color-red-350);
}

p {
  text-align: center;
  margin-top: var(--pico-typography-spacing-vertical);
  margin-bottom: 0;
  font-weight: 800;
}
</style>
