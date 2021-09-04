import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { catchError, pluck, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Menu, MenuItem } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getFood(): Promise<MenuItem[]> {
    return this.http
      .get<Menu>(environment.menuUrl)
      .pipe(
        tap((data) => console.log(data)),
        pluck('menu'),
        catchError((err: Error) => {
          console.error(err)
          return of([])
        }),
      )
      .toPromise()
  }
}
