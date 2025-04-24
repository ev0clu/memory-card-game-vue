<script setup lang="ts">
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import router from '@/router'
import { useStore } from '@/composable/useStore'

const options = [
  {
    level: 'easy',
    boardSize: 16, // 4x4 board
  },
  {
    level: 'medium',
    boardSize: 36, // 6x6 board
  },
  {
    level: 'hard',
    boardSize: 64, // 8x8 board
  },
]

const { addPokemon } = useStore()
const difficultyLevel = ref('')
const error = ref(false)
const isLoading = ref(false)

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function handleFormSubmit() {
  if (difficultyLevel.value) {
    const selectedOption = options.find((option) => option.level === difficultyLevel.value)

    if (selectedOption) {
      isLoading.value = true
      const idsArray: number[] = []

      while (idsArray.length < selectedOption.boardSize / 2) {
        const newPokemonId = randomIntFromInterval(1, 800)
        const isExist = idsArray.find((element) => element === newPokemonId)
        if (!isExist) idsArray.push(newPokemonId)
      }

      for (let i = 0; i < idsArray.length; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idsArray[i]}`)

        if (response) {
          const result = await response.json()
          addPokemon(result.name, result.sprites.other.dream_world.front_default)
        } else {
          toast.error('Fetch error!')
        }
      }
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
  <div class="home">
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
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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
