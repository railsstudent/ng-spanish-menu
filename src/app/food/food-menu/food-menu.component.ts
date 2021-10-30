import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs'
import { map, takeUntil, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { MenuOptions } from '../enums'
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
  menuOptionSub$ = new BehaviorSubject<string>(MenuOptions.All)
  unsubscribe$ = new Subject<boolean>()

  qtyMap: Record<string, number> | undefined

  constructor(private service: FoodService) {}

  ngOnInit(): void {
    const menuUrl = `${environment.baseUrl}/menu`

    this.menuItems$ = combineLatest([
      this.service.getFood(menuUrl),
      this.menuOptionSub$,
      this.service.quantityAvailableMap$,
    ]).pipe(
      map(([menuItems, option]) => {
        return {
          menuItems,
          option,
        }
      }),
      map(({ menuItems, option }) => {
        if (!menuItems) {
          return undefined
        }
        if (option === MenuOptions.All) {
          return menuItems
        }
        return menuItems.reduce((acc, menuItem) => {
          // menuItem.choices.
          const availableChoices = menuItem.choices.filter((choice) => this.qtyMap && this.qtyMap[choice.id] > 0)
          if (availableChoices.length > 0) {
            const selectableMenuItem: MenuItem = {
              ...menuItem,
              choices: availableChoices,
            }
            return acc.concat(selectableMenuItem)
          }
          return acc
        }, [] as MenuItem[])
      }),
      takeUntil(this.unsubscribe$),
    )

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
      .subscribe((choice) => this.addDynamicFoodChoice.emit(choice))
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
