export interface Choice {
  id: string
  name: string
  description: string
  price: number
}

export interface Menu {
  id: string
  question: string
  choices: Choice[]
}
