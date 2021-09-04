export interface Choice {
  id: string
  name: string
  description: string
  price: number
}

export interface Menu {
  menu: MenuItem[]
}
export interface MenuItem {
  id: string
  question: string
  choices: Choice[]
}
