import { BehaviorSubject, Observable, of } from 'rxjs'

import { FoodServiceInterface, MenuItem, PriceQuantity, TotalCost } from '../interfaces'

export class MockFoodService implements FoodServiceInterface {
  // #region Properties (2)

  private quantityAvailableSub$ = new BehaviorSubject<Record<string, number> | undefined>(undefined)

  // eslint-disable-next-line @typescript-eslint/member-ordering
  quantityAvailableMap$ = this.quantityAvailableSub$.asObservable()

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(private menuItems?: MenuItem[]) {}

  // #endregion Constructors (1)

  // #region Public Methods (5)

  public calculateTotal(food: PriceQuantity[], tip = 0): TotalCost {
    const unroundedTotal = food.reduce((acc, choice) => {
      const { price, quantity } = choice
      return acc + price * quantity
    }, 0)

    const subTotal = this.roundAmount(unroundedTotal)
    const totalTip = this.roundAmount(unroundedTotal * tip)
    const total = this.roundAmount(unroundedTotal + totalTip)

    return {
      subTotal,
      totalTip,
      total,
    }
  }

  public getFood(): Observable<MenuItem[] | undefined> {
    const qtyMap = this.buildQtyMap()
    this.quantityAvailableSub$.next(qtyMap)
    return of(this.menuItems)
  }

  public getQuantity(id: string): number {
    const qtyAvailableMap = this.getLatestQtyMap()
    if (qtyAvailableMap) {
      return qtyAvailableMap[id] || 0
    }
    return 0
  }

  public getTips(): Observable<number[]> {
    return of([0, 5, 10, 15, 20])
  }

  public updateQuantity(id: string, quantity: number): void {
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

  // #endregion Public Methods (5)

  // #region Private Methods (3)

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

  private getLatestQtyMap() {
    const qtyAvailableMap = this.quantityAvailableSub$.getValue()
    if (!qtyAvailableMap) {
      const qtyMap = this.buildQtyMap()
      this.quantityAvailableSub$.next(qtyMap)
    }
    return this.quantityAvailableSub$.getValue()
  }

  private roundAmount(amount: number): number {
    const cents = 100

    return Math.round(amount * cents) / cents
  }

  // #endregion Private Methods (3)
}
