export interface Choice {
  id: string
  name: string
  description: string
  currency: string
  price: number
  available: boolean
}

export interface Menu {
  menu: MenuItem[]
}
export interface MenuItem {
  id: string
  question: string
  choices: Choice[]
}
