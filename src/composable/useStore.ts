import { ref } from 'vue'
import { restoreStorage, saveStorage } from '../localStorage'
import type { Pokemon, Score } from '@/types'

const pokemons = ref<Pokemon[]>([])

export function useStore() {
  const addPokemons = (array: Pokemon[]) => {
    pokemons.value = [...array]
  }

  const setPokemonFound = (id: number) => {
    pokemons.value.map((item) => (item.id === id ? (item.isFound = true) : item))
  }

  const addScore = (name: string, time: number) => {
    let scoreArray: Score[] = []
    const newScore = { id: crypto.randomUUID(), name, time, createdAt: new Date() }

    const restoredArray = restoreStorage()

    if (restoredArray) {
      scoreArray = [...restoredArray]
      scoreArray.push(newScore)
    } else {
      scoreArray.push(newScore)
    }
    saveStorage(scoreArray)
  }

  const getScores = () => {
    const historyScore = restoreStorage()

    if (historyScore) {
      return [...historyScore].sort((a, b) => a.time - b.time)
    } else return []
  }

  return {
    pokemons,
    addPokemons,
    setPokemonFound,
    addScore,
    getScores,
  }
}
