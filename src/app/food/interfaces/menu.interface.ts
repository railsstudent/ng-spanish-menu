export interface Choice {
  id: string
  name: string
  description: string
  currency: string
  price: number
  available: boolean
  quantity: number
}

export interface Menu {
  menu: MenuItem[]
}
export interface MenuItem {
  id: string
  question: string
  choices: Choice[]
}

export interface Quantity {
  qty: number
}
