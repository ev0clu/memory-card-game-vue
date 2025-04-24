import { ref } from 'vue'
import { restoreStorage, saveStorage } from '../localStorage'
import type { Pokemon, Score } from '@/types'

export function useStore() {
  const pokemons = ref<Pokemon[]>([])
  const scores = ref<Score[]>([])

  ;(() => {
    const restoredScores = restoreStorage()
    if (restoredScores) scores.value = restoredScores
  })()

  const addScore = (name: string, time: number) => {
    scores.value.push({ name, time })
    saveStorage(scores.value)
  }

  return {
    pokemons,
    addScore,
  }
}
