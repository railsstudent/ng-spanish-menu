import { BehaviorSubject, of } from 'rxjs'

import { MenuItem } from '../interfaces'

export class MockFoodService {
  private quantityAvailableSub$ = new BehaviorSubject<Record<string, number> | undefined>(undefined)
  quantityAvailableMap$ = this.quantityAvailableSub$.asObservable()

  constructor(private menuItems?: MenuItem[]) {}

  getFood() {
    if (!this.menuItems) {
      this.quantityAvailableSub$.next(undefined)
    } else {
      const qtyMap = this.menuItems.reduce((acc, mi) => {
        mi.choices.forEach(({ id, quantity }) => {
          acc[id] = quantity
        })
        return acc
      }, {} as Record<string, number>)
      this.quantityAvailableSub$.next(qtyMap)
    }
    return of(this.menuItems)
  }

  calculateTotal(food: { price: number; quantity: number }[]): number {
    const cents = 100
    const unroundedTotal = food.reduce((acc, choice) => {
      const { price, quantity } = choice
      return acc + price * quantity
    }, 0)

    return Math.round(unroundedTotal * cents) / cents
  }

  updateQuantity(id: string, quantity: number) {
    const qtyAvailableMap = this.quantityAvailableSub$.getValue()
    if (qtyAvailableMap) {
      const oldQty = qtyAvailableMap[id]
      const nextQty = oldQty - quantity
      if (nextQty >= 0) {
        this.quantityAvailableSub$.next({
          ...qtyAvailableMap,
          [id]: nextQty,
        })
      }
    }
  }
}
