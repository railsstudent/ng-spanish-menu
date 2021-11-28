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
    <p>Async/await sum: {{ sum }}</p>
    <app-food-menu (addDynamicFoodChoice)="addDynamicFoodChoice($event)"></app-food-menu>
    <p>Your order</p>
    <section class="ordered">
      <ng-container #viewContainerRef></ng-container>
    </section>
    <ng-container *ngIf="tips$ | async as tips">
      <app-food-total
        [isFoodOrdered]="orderedFood && orderedFood.length > 0"
        [currency]="orderedFood?.[0]?.currency || ''"
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
  sum = 0

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

  async ngOnInit(): Promise<void> {
    const tipUrl = `${environment.baseUrl}/tips`
    this.tips$ = this.foodService.getTips(tipUrl).pipe(takeUntil(this.unsubscribe$))

    for (let i = 0; i < 4; i++) {
      /* eslint-disable-next-line no-await-in-loop */
      this.sum = (await this.square(i)) + (await this.cube(i))
    }

    const sumAndCubePromises = await Promise.all(
      [1, 2, 3, 4].map(async (i) => (await this.square(i)) + (await this.cube(i))),
    )

    this.sum = sumAndCubePromises.reduce((acc, value) => acc + value)
  }

  private async square(num: number): Promise<number> {
    return Promise.resolve(num * num)
  }

  private async cube(num: number): Promise<number> {
    return Promise.resolve(num * num * num)
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
