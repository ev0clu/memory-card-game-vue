<script setup lang="ts">
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import router from '@/router'
import { useStore } from '@/composable/useStore'
import ContainerWrapper from '@/components/ContainerWrapper.vue'
import type { Pokemon } from '@/types'

const options = [
  {
    level: 'easy',
    boardSize: 4, // 2x2 board
  },
  {
    level: 'medium',
    boardSize: 6, // 2x3 board
  },
  {
    level: 'hard',
    boardSize: 8, // 2x4 board
  },
]

const { addPokemons } = useStore()
const difficultyLevel = ref('')
const error = ref(false)
const isLoading = ref(false)

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffle(array: Pokemon[]) {
  // Fisher-Yates Sorting Algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function duplicate(array: Pokemon[]) {
  const duplicatedArray = array.reduce((res: Pokemon[], current) => [...res, current, current], [])
  return duplicatedArray
}

async function handleFormSubmit() {
  if (difficultyLevel.value) {
    const selectedOption = options.find((option) => option.level === difficultyLevel.value)

    if (selectedOption) {
      isLoading.value = true

      const responseArray: Pokemon[] = []

      while (responseArray.length < selectedOption.boardSize / 2) {
        const newPokemonId = randomIntFromInterval(1, 800)
        const isExist = responseArray.find((element) => element.id === newPokemonId)
        if (!isExist) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${newPokemonId}`)

          if (response) {
            const result = await response.json()

            responseArray.push({
              id: newPokemonId,
              name: result.name,
              imageUrl: result.sprites.other.home.front_default,
            })
          } else {
            toast.error('Fetch error!')
          }
        }
      }
      const duplicatedResponseArray = duplicate(responseArray)
      const shuffledDuplicatedResponseArray = shuffle(duplicatedResponseArray)

      addPokemons(shuffledDuplicatedResponseArray)
      router.push('/game')
    } else {
      toast.error('Something went wrong. Try again!')
    }
  } else {
    error.value = true
  }
}

watch(difficultyLevel, (newVal) => {
  if (newVal) {
    error.value = false
  }
})
</script>

<template>
  <ContainerWrapper>
    <img alt="Pokemon logo" src="@/assets/pokemon-logo.png" width="600" height="auto" />
    <form v-if="!isLoading" @submit.prevent="handleFormSubmit">
      <fieldset>
        <select
          v-model="difficultyLevel"
          aria-label="Select difficulty level"
          :aria-invalid="error === true || undefined"
        >
          <option selected disabled value="">--Choose a difficulty level--</option>
          <option v-for="option in options" :value="option.level" :key="option.level">
            {{ option.level.toUpperCase() }}
          </option>
        </select>
        <small v-if="error">Please select a difficulty!</small>
      </fieldset>
      <button>Start Game</button>
    </form>
    <span v-else aria-busy="true" class="loader">Game is loading...</span>
  </ContainerWrapper>
</template>

<style scoped>
img {
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loader {
  margin-top: 4rem;
  font-size: xx-large;
  font-weight: 800;
}
</style>
