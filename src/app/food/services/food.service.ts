import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, pluck, share, tap } from 'rxjs/operators'

import { Menu, MenuItem } from '../interfaces'

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

  calculateTotal(food: { price: number; quantity: number }[]): number {
    const cents = 100
    const unroundedTotal = food.reduce((acc, choice) => {
      const { price, quantity } = choice
      return acc + price * quantity
    }, 0)

    return Math.round(unroundedTotal * cents) / cents
  }

  isEnoughQuantity(id: string, quantity: number) {
    const qtyAvailableMap = this.quantityAvailableSub$.getValue()
    if (!qtyAvailableMap) {
      return false
    }

    const qtyAvailable = qtyAvailableMap[id] || 0
    return qtyAvailable - quantity >= 0
  }

  updateQuatity(id: string, quantity: number) {
    const qtyAvailableMap = this.quantityAvailableSub$.getValue()
    if (qtyAvailableMap && qtyAvailableMap[id]) {
      this.quantityAvailableSub$.next({
        ...qtyAvailableMap,
        id: qtyAvailableMap[id] - quantity,
      })
    }
  }
}
