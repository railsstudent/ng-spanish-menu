import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, pluck, share, tap } from 'rxjs/operators'

import { FoodServiceInterface, Menu, MenuItem, PriceQuantity, Tip, TotalCost } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class FoodService implements FoodServiceInterface {
  // #region Properties (2)

  private quantityAvailableSub$ = new BehaviorSubject<Record<string, number> | undefined>(undefined)

  // eslint-disable-next-line @typescript-eslint/member-ordering
  quantityAvailableMap$ = this.quantityAvailableSub$.asObservable()

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(private http: HttpClient) {}

  // #endregion Constructors (1)

  // #region Public Methods (5)

  public calculateTotal(food: PriceQuantity[], tip = 0): TotalCost {
    const unroundedTotal = food.reduce((acc, choice) => {
      const { price, quantity } = choice
      return acc + price * quantity
    }, 0)

    const subTotal = this.roundAmount(unroundedTotal)
    const totalTip = this.roundAmount(unroundedTotal * tip)
    const total = this.roundAmount(subTotal + totalTip)

    return {
      subTotal,
      totalTip,
      total,
    }
  }

  public getFood(url: string): Observable<MenuItem[] | undefined> {
    return this.http.get<Menu>(url).pipe(
      pluck('menu'),
      tap((menu) => {
        console.log('menu', menu)
        const qtyMap = menu.reduce((acc, mi) => {
          mi.choices.forEach(({ id, quantity }) => {
            acc[id] = quantity
          })
          return acc
        }, {} as Record<string, number>)
        this.quantityAvailableSub$.next(qtyMap)
      }),
      catchError((err: Error) => {
        console.error(err)
        return of(undefined)
      }),
      share(),
    )
  }

  public getQuantity(id: string): number {
    const qtyAvailableMap = this.quantityAvailableSub$.getValue()
    if (qtyAvailableMap) {
      return qtyAvailableMap[id] || 0
    }
    return 0
  }

  public getTips(url: string): Observable<number[]> {
    return this.http.get<Tip>(url).pipe(
      pluck('tips'),
      catchError((err: Error) => {
        console.error(err)
        return of([0])
      }),
      share(),
    )
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

  // #region Private Methods (1)

  private roundAmount(amount: number): number {
    const cents = 100

    return Math.round(amount * cents) / cents
  }

  // #endregion Private Methods (1)
}
