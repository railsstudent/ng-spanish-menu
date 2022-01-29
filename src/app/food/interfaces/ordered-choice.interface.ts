export interface OrderedFoodChoice {
  id: string
  name: string
  description: string
  currency: string
  price: number
  quantity: number
  isLowSupply?: boolean
}
