import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'

import { OrderedFoodChoice } from '../interfaces'
import { FoodService } from '../services'

@Component({
  selector: 'app-food-shell',
  templateUrl: './food-shell.component.html',
  styleUrls: ['./food-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodShellComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  orederedViewContainer: ViewContainerRef

  orderedFood: OrderedFoodChoice[] = []

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private foodService: FoodService) {}

  async addDynamicFoodChoice(choice: OrderedFoodChoice): Promise<void> {
    const lazyComponent = await import('../food-card/food-card.component')
    const resolvedComponent = this.componentFactoryResolver.resolveComponentFactory(lazyComponent.FoodCardComponent)
    const foodCardComponent = this.orederedViewContainer.createComponent(resolvedComponent)
    foodCardComponent.instance.ordered = {
      ...choice,
    }

    foodCardComponent.instance.total = this.foodService.calculateTotal([choice])
    this.orderedFood = [...this.orderedFood, choice]
  }
}
