import { Observable } from 'rxjs'

import { MenuItem } from './menu.interface'
import { PriceQuantity } from './price-quantity.interface'
import { TotalCost } from './total.interface'

export interface FoodServiceInterface {
  getFood(url: string): Observable<MenuItem[] | undefined>
  calculateTotal(food: PriceQuantity[], tip: number): TotalCost
  updateQuantity(id: string, quantity: number, isLowSupply: boolean): void
  getQuantity(id: string): number
  getTips(url: string): Observable<number[]>
}
