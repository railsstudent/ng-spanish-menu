export interface Choice {
  id: string
  name: string
  description: string
  currency: string
  price: number
  quantity: number
  ingredients: string
}

export interface Menu {
  menu: MenuItem[]
}
export interface MenuItem {
  id: string
  question: string
  choices: Choice[]
}
