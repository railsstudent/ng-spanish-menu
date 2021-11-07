import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, pluck, share, tap } from 'rxjs/operators'

import { Menu, MenuItem, Tip, TotalCost } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private quantityAvailableSub$ = new BehaviorSubject<Record<string, number> | undefined>(undefined)
  quantityAvailableMap$ = this.quantityAvailableSub$.asObservable()

  constructor(private http: HttpClient) {}

  getFood(url: string): Observable<MenuItem[] | undefined> {
    return this.http.get<Menu>(url).pipe(
      pluck('menu'),
      tap((menu) => {
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

  private roundAmount(amount: number): number {
    const cents = 100

    return Math.round(amount * cents) / cents
  }

  calculateTotal(food: { price: number; quantity: number }[], tip = 0): TotalCost {
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

  getQuantity(id: string): number {
    const qtyAvailableMap = this.quantityAvailableSub$.getValue()
    if (qtyAvailableMap) {
      return qtyAvailableMap[id] || 0
    }
    return 0
  }

  getTips(url: string): Observable<number[]> {
    return this.http.get<Tip>(url).pipe(
      pluck('tips'),
      catchError((err: Error) => {
        console.error(err)
        return of([0])
      }),
      share(),
    )
  }
}
