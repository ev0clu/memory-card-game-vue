import { ref } from 'vue'
import { restoreStorage, saveStorage } from '../localStorage'
import type { Score } from '@/types'

export function useStore() {
  const pokemons = ref<{ name: string; image: string }[]>([])
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
