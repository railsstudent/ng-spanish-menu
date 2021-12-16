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
    <app-food-menu class="block mb-2" (addDynamicFoodChoice)="addDynamicFoodChoice($event)"></app-food-menu>
    <p>Your order</p>
    <section class="flex flex-wrap items-stretch p-2 mb-1">
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
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodShellComponent implements OnInit, OnDestroy {
  // #region Properties (6)

  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  public orderedViewContainer: ViewContainerRef

  public componentRefs: ComponentRef<FoodCardComponent>[] = []
  public orderedFood: OrderedFoodChoice[] = []
  tips$: Observable<number[]>

  public totalBreakdown: TotalCost = {
    subTotal: 0,
    totalTip: 0,
    total: 0,
  }

  unsubscribe$ = new Subject<boolean>()

  // #endregion Properties (6)

  // #region Constructors (1)

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private foodService: FoodService,
    private cdr: ChangeDetectorRef,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public async addDynamicFoodChoice(choice: OrderedFoodChoice): Promise<void> {
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

  public calculate(tip: number): void {
    const newTotal = this.foodService.calculateTotal(this.orderedFood, tip)
    this.totalBreakdown = {
      ...newTotal,
    }
  }

  public ngOnDestroy(): void {
    this.destroyComponents()
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }

  public ngOnInit(): void {
    const tipUrl = `${environment.baseUrl}/tips`
    this.tips$ = this.foodService.getTips(tipUrl).pipe(takeUntil(this.unsubscribe$))
  }

  // #endregion Public Methods (4)

  // #region Private Methods (1)

  private destroyComponents() {
    for (const componentRef of this.componentRefs) {
      componentRef.destroy()
    }
    if (this.orderedViewContainer) {
      this.orderedViewContainer.clear()
    }
  }

  // #endregion Private Methods (1)
}
