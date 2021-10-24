import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { OrderedFoodChoice } from '../interfaces'
import { FoodService } from '../services'

@Component({
  selector: 'app-food-shell',
  template: `
    <p>Angular Nation Special Menu</p>
    <app-food-menu (addDynamicFoodChoice)="addDynamicFoodChoice($event)"></app-food-menu>
    <p>Your order</p>
    <section class="ordered">
      <ng-container #viewContainerRef></ng-container>
    </section>
    <ng-container *ngIf="tips$ | async as tips">
      <app-food-total [choices]="orderedFood" [tips]="tips"></app-food-total>
    </ng-container>
  `,
  styleUrls: ['./food-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodShellComponent implements OnInit, OnDestroy {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  orederedViewContainer: ViewContainerRef

  orderedFood: OrderedFoodChoice[] = []
  tips$: Observable<number[]>
  unsubscribe$ = new Subject<boolean>()

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private foodService: FoodService) {}

  ngOnInit(): void {
    const tipUrl = `${environment.baseUrl}/tips`
    this.tips$ = this.foodService.getTips(tipUrl).pipe(takeUntil(this.unsubscribe$))
  }

  async addDynamicFoodChoice(choice: OrderedFoodChoice): Promise<void> {
    const lazyComponent = await import('../food-card/food-card.component')
    const resolvedComponent = this.componentFactoryResolver.resolveComponentFactory(lazyComponent.FoodCardComponent)
    const foodCardComponent = this.orederedViewContainer.createComponent(resolvedComponent)
    const { total } = this.foodService.calculateTotal([choice])

    console.log('choice', choice, 'total', total)
    foodCardComponent.instance.ordered = {
      ...choice,
    }

    foodCardComponent.instance.total = total
    this.orderedFood = [...this.orderedFood, choice]
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }
}
