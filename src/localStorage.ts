import type { Score } from './types'

export function saveStorage(arr: Score[]) {
  localStorage.setItem('pokemon-game-scores', JSON.stringify(arr))
}

export function restoreStorage(): Score[] | null {
  const restoredData = localStorage.getItem('pokemon-game-scores')
  if (!restoredData) return null
  else return JSON.parse(restoredData)
}
