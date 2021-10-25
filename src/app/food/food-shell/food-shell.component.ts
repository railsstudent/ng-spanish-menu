import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { FoodCardComponent } from '../food-card'
import { OrderedFoodChoice, TotalCost } from '../interfaces'
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
      <app-food-total
        [isFoodOrdered]="orderedFood && orderedFood.length > 0"
        [tips]="tips"
        [totalBreakdown]="totalBreakdown"
        (getCheck)="calculate($event)"
      ></app-food-total>
    </ng-container>
  `,
  styleUrls: ['./food-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodShellComponent implements OnInit, OnDestroy {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  orderedViewContainer: ViewContainerRef

  tips$: Observable<number[]>
  unsubscribe$ = new Subject<boolean>()
  componentRefs: ComponentRef<FoodCardComponent>[] = []

  orderedFood: OrderedFoodChoice[] = []
  totalBreakdown: TotalCost = {
    subTotal: 0,
    totalTip: 0,
    total: 0,
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private foodService: FoodService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const tipUrl = `${environment.baseUrl}/tips`
    this.tips$ = this.foodService.getTips(tipUrl).pipe(takeUntil(this.unsubscribe$))
  }

  async addDynamicFoodChoice(choice: OrderedFoodChoice): Promise<void> {
    const lazyComponent = await import('../food-card/food-card.component')
    const resolvedComponent = this.componentFactoryResolver.resolveComponentFactory(lazyComponent.FoodCardComponent)
    const componentRef = this.orderedViewContainer.createComponent(resolvedComponent)
    const { total } = this.foodService.calculateTotal([choice])

    componentRef.instance.ordered = {
      ...choice,
    }

    componentRef.instance.total = total
    console.log('instance', componentRef.instance)
    this.componentRefs.push(componentRef)

    this.orderedFood = [...this.orderedFood, choice]
    this.cdr.detectChanges()
  }

  calculate(tip: number) {
    const newTotal = this.foodService.calculateTotal(this.orderedFood, tip)
    this.totalBreakdown = {
      ...newTotal,
    }
  }

  private destroyComponents() {
    for (const componentRef of this.componentRefs) {
      componentRef.destroy()
    }
    if (this.orderedViewContainer) {
      this.orderedViewContainer.clear()
    }
  }

  ngOnDestroy(): void {
    this.destroyComponents()
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }
}
