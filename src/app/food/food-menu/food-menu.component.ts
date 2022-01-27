import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs'
import { map, takeUntil, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { MenuOptions } from '../enums'
import { Choice, MenuItem, OrderedFoodChoice, Stock } from '../interfaces'
import { FoodService } from '../services'

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodMenuComponent implements OnInit, OnDestroy {
  // #region Properties (6)

  @Output()
  public addDynamicFoodChoice = new EventEmitter<OrderedFoodChoice>()
  handleFoodChoiceSub$ = new Subject<OrderedFoodChoice>()
  menuItems$: Observable<MenuItem[] | undefined>
  menuOptionSub$ = new BehaviorSubject<string>(MenuOptions.all)
  public qtyMap: Record<string, Stock> | undefined
  unsubscribe$ = new Subject<boolean>()

  // #endregion Properties (6)

  // #region Constructors (1)

  constructor(private service: FoodService) {}

  // #endregion Constructors (1)

  // #region Public Methods (5)

  public choiceTrackByFn(index: number, choice: Choice): string | number {
    return choice ? choice.id : index
  }

  public filterMenuItems(menuItems: MenuItem[] | undefined, option: string): MenuItem[] | undefined {
    if (!menuItems || option === 'all') {
      return menuItems
    }

    const typedOptionString = option as keyof typeof MenuOptions
    const typedOption = MenuOptions[typedOptionString]

    const filterFuncMap = {
      [MenuOptions.all]: () => true,
      [MenuOptions.available]: (choice: Choice) => this.qtyMap && this.qtyMap[choice.id].quantity > 0,
      [MenuOptions.soldOut]: (choice: Choice) => this.qtyMap && this.qtyMap[choice.id].quantity <= 0,
    }

    const filterFunc = filterFuncMap[typedOption]
    return menuItems.reduce((acc, menuItem) => {
      const matchedChoices = menuItem.choices.filter(filterFunc)
      if (matchedChoices.length > 0) {
        return acc.concat({
          ...menuItem,
          choices: matchedChoices,
        })
      }
      return acc
    }, [] as MenuItem[])
  }

  public menuItemTrackByFn(index: number, menuItem: MenuItem): string | number {
    return menuItem ? menuItem.id : index
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.unsubscribe()
  }

  public ngOnInit(): void {
    const menuUrl = `${environment.baseUrl}/menu`

    this.menuItems$ = combineLatest([
      this.service.getFood(menuUrl),
      this.menuOptionSub$,
      this.service.quantityAvailableMap$,
    ]).pipe(
      map(([menuItems, option]) => ({
        menuItems,
        option,
      })),
      map(({ menuItems, option }) => this.filterMenuItems(menuItems, option)),
      takeUntil(this.unsubscribe$),
    )

    this.service.quantityAvailableMap$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((quantityMap) => (this.qtyMap = this.updateQuantity(quantityMap)))

    this.handleFoodChoiceSub$
      .pipe(
        tap(({ id, quantity }) => this.service.updateQuantity(id, quantity)),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((choice) => this.addDynamicFoodChoice.emit(choice))
  }

  private updateQuantity(quantityMap: Record<string, number> | undefined) {
    if (!quantityMap) {
      return undefined
    }

    return Object.keys(quantityMap).reduce((acc: Record<string, Stock>, choiceId) => {
      if (acc[choiceId]) {
        acc[choiceId].quantity = quantityMap[choiceId]
      } else {
        acc[choiceId] = {
          quantity: quantityMap[choiceId],
          totalStock: quantityMap[choiceId],
        }
      }
      return acc
    }, { ...this.qtyMap } || {})
  }
  // #endregion Public Methods (5)
}
