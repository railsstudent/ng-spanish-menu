import { FoodService } from '../services'
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { Choice, MenuItem } from '../interfaces'
import { takeUntil } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs'
import { environment } from 'src/environments/environment'
import { OrderedFoodChoice } from '../interfaces'

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodMenuComponent implements OnInit, OnDestroy {
  @Output()
  handleFoodChoice = new EventEmitter<OrderedFoodChoice>()

  menuItems$: Observable<MenuItem[] | undefined>
  unsubscribe$ = new Subject<boolean>()

  constructor(private service: FoodService) {}

  ngOnInit(): void {
    this.menuItems$ = this.service.getFood(environment.menuUrl).pipe(takeUntil(this.unsubscribe$))
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
