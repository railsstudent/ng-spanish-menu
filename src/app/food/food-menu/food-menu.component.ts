import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { Choice, MenuItem, OrderedFoodChoice } from '../interfaces'
import { FoodService } from '../services'

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodMenuComponent implements OnInit, OnDestroy {
  @Output()
  addDynamicFoodChoice = new EventEmitter<OrderedFoodChoice>()

  menuItems$: Observable<MenuItem[] | undefined>
  handleFoodChoiceSub$ = new Subject<OrderedFoodChoice>()
  unsubscribe$ = new Subject<boolean>()

  qtyMap: Record<string, number> | undefined

  constructor(private service: FoodService) {}

  ngOnInit(): void {
    const menuUrl = `${environment.baseUrl}/menu`
    this.menuItems$ = this.service.getFood(menuUrl).pipe(takeUntil(this.unsubscribe$))

    this.service.quantityAvailableMap$.pipe(takeUntil(this.unsubscribe$)).subscribe((updatedQtyMap) => {
      if (!updatedQtyMap) {
        this.qtyMap = undefined
      } else {
        this.qtyMap = {
          ...updatedQtyMap,
        }
      }
    })

    this.handleFoodChoiceSub$
      .pipe(
        tap(({ id, quantity }) => this.service.updateQuantity(id, quantity)),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((choice) => {
        this.addDynamicFoodChoice.emit(choice)
      })
  }

  menuItemTrackByFn(index: number, menuItem: MenuItem): string | number {
    return menuItem ? menuItem.id : index
  }

  choiceTrackByFn(index: number, choice: Choice) {
    return choice ? choice.id : index
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.unsubscribe()
  }
}
