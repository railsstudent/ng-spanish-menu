import { BehaviorSubject, Observable, of } from 'rxjs'

import { MenuItem, TotalCost } from '../interfaces'

export class MockFoodService {
  private quantityAvailableSub$ = new BehaviorSubject<Record<string, number> | undefined>(undefined)
  quantityAvailableMap$ = this.quantityAvailableSub$.asObservable()

  constructor(private menuItems?: MenuItem[]) {}

  private buildQtyMap(): Record<string, number> | undefined {
    if (!this.menuItems) {
      return undefined
    }
    return this.menuItems.reduce((acc, mi) => {
      mi.choices.forEach(({ id, quantity }) => {
        acc[id] = quantity
      })
      return acc
    }, {} as Record<string, number>)
  }

  getFood(): Observable<MenuItem[] | undefined> {
    const qtyMap = this.buildQtyMap()
    this.quantityAvailableSub$.next(qtyMap)
    return of(this.menuItems)
  }

  calculateTotal(food: { price: number; quantity: number }[], tip = 0): TotalCost {
    const cents = 100
    const unroundedTotal = food.reduce((acc, choice) => {
      const { price, quantity } = choice
      return acc + price * quantity
    }, 0)

    const totalAfterTip = unroundedTotal * (1 + tip)
    const totalTip = unroundedTotal * tip
    return {
      totalBeforeTip: Math.round(unroundedTotal * cents) / cents,
      totalTip: Math.round(totalTip * cents) / cents,
      total: Math.round(totalAfterTip * cents) / cents,
    }
  }

  updateQuantity(id: string, quantity: number): void {
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

  private getLatestQtyMap() {
    const qtyAvailableMap = this.quantityAvailableSub$.getValue()
    if (!qtyAvailableMap) {
      const qtyMap = this.buildQtyMap()
      this.quantityAvailableSub$.next(qtyMap)
    }
    return this.quantityAvailableSub$.getValue()
  }

  getQuantity(id: string): number {
    const qtyAvailableMap = this.getLatestQtyMap()
    if (qtyAvailableMap) {
      return qtyAvailableMap[id] || 0
    }
    return 0
  }
}
