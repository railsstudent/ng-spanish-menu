import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
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
  handleFoodChoice = new EventEmitter<OrderedFoodChoice>()

  menuItems$: Observable<MenuItem[] | undefined>
  qtyMap$: Observable<Record<string, number> | undefined>
  unsubscribe$ = new Subject<boolean>()

  constructor(private service: FoodService) {}

  ngOnInit(): void {
    this.menuItems$ = this.service.getFood(environment.menuUrl).pipe(takeUntil(this.unsubscribe$))
    this.qtyMap$ = this.service.quantityAvailableMap$
  }

  menumItemTrackByFn(index: number, menuItem: MenuItem): string | number {
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
