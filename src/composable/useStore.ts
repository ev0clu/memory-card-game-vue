import { ref } from 'vue'
import { restoreStorage, saveStorage } from '../localStorage'
import type { Pokemon, Score } from '@/types'

const pokemons = ref<Pokemon[]>([])

export function useStore() {
  const scores = ref<Score[]>([])

  ;(() => {
    const restoredScores = restoreStorage()
    if (restoredScores) scores.value = restoredScores
  })()

  const addPokemons = (array: Pokemon[]) => {
    pokemons.value = [...array]
  }

  const setPokemonFound = (id: number) => {
    pokemons.value.map((item) => (item.id === id ? (item.isFound = true) : item))
  }

  const addScore = (name: string, time: number) => {
    scores.value.push({ name, time })
    saveStorage(scores.value)
  }

  return {
    pokemons,
    addPokemons,
    setPokemonFound,
    addScore,
  }
}
