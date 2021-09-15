import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, pluck, share } from 'rxjs/operators'
import { Menu, MenuItem } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getFood(url: string): Observable<MenuItem[] | undefined> {
    return this.http.get<Menu>(url).pipe(
      pluck('menu'),
      catchError((err: Error) => {
        console.error(err)
        return of(undefined)
      }),
      share(),
    )
  }
}