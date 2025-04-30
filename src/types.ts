export type Pokemon = {
  id: number
  uid: string
  name: string
  imageUrl: string
  isFound: boolean
}

export type Score = {
  id: string
  name: string
  time: number
  createdAt: Date
}
