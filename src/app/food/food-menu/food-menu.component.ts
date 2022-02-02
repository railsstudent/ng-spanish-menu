import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { MENU_OPTIONS } from '../enums'
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
  menuItems$: Observable<{ menuItems: MenuItem[]; option: string } | undefined>
  menuOptionSub$ = new BehaviorSubject<string>(MENU_OPTIONS.ALL)
  public qtyMap: Record<string, Stock> | undefined
  unsubscribe$ = new Subject<boolean>()
  subscriptions: Subscription[] = []

  // #endregion Properties (6)

  // #region Constructors (1)

  constructor(private service: FoodService) {}

  // #endregion Constructors (1)

  // #region Public Methods (5)

  public choiceTrackByFn(index: number, choice: Choice): string | number {
    return choice ? choice.id : index
  }

  public filterMenuItems(menuItems: MenuItem[] | undefined, option: string): MenuItem[] {
    if (!menuItems) {
      return []
    }

    const typedOptionString = option as keyof typeof MENU_OPTIONS
    const typedOption = MENU_OPTIONS[typedOptionString]

    const filterFuncMap = {
      [MENU_OPTIONS.ALL]: () => true,
      [MENU_OPTIONS.AVAILABLE]: (choice: Choice) => this.qtyMap && this.qtyMap[choice.id].quantity > 0,
      [MENU_OPTIONS.SOLD_OUT]: (choice: Choice) => this.qtyMap && this.qtyMap[choice.id].quantity <= 0,
      [MENU_OPTIONS.LOW_SUPPLY]: (choice: Choice) =>
        this.qtyMap && this.qtyMap[choice.id].quantity > 0 && this.qtyMap[choice.id].isLowSupply,
    }

    const filterFunc = filterFuncMap[typedOption]
    return menuItems.reduce((acc: MenuItem[], menuItem) => {
      const matchedChoices = menuItem.choices.filter(filterFunc)
      if (matchedChoices.length > 0) {
        return acc.concat({
          ...menuItem,
          choices: matchedChoices,
        })
      }
      return acc
    }, [])
  }

  public menuItemTrackByFn(index: number, menuItem: MenuItem): string | number {
    return menuItem ? menuItem.id : index
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.unsubscribe()
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe()
    }
  }

  public ngOnInit(): void {
    const menuUrl = `${environment.baseUrl}/menu`

    this.menuItems$ = combineLatest([
      this.service.getFood(menuUrl),
      this.menuOptionSub$,
      this.service.quantityAvailableMap$,
    ]).pipe(
      map(([menuItems, option]) => {
        if (menuItems) {
          const filteredMenuItems = this.filterMenuItems(menuItems, option)
          return {
            menuItems: filteredMenuItems,
            option,
          }
        }
        return undefined
      }),
      takeUntil(this.unsubscribe$),
    )

    this.subscriptions.push(
      this.service.quantityAvailableMap$.subscribe((quantityMap) => (this.qtyMap = this.updateQuantity(quantityMap))),
    )

    this.subscriptions.push(
      this.handleFoodChoiceSub$.subscribe((choice) => {
        const { id, quantity, isLowSupply = false } = choice
        this.service.updateQuantity(id, quantity, isLowSupply)
        this.addDynamicFoodChoice.emit(choice)
      }),
    )
  }

  private updateQuantity(quantityMap: Record<string, Stock> | undefined) {
    if (!quantityMap) {
      return undefined
    }

    return Object.keys(quantityMap).reduce((acc: Record<string, Stock>, choiceId) => {
      acc[choiceId] = {
        ...quantityMap[choiceId],
      }
      return acc
    }, {})
  }
  // #endregion Public Methods (5)
}
