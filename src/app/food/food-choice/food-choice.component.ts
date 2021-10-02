import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Choice, OrderedFoodChoice } from '../interfaces'

@Component({
  selector: 'app-food-choice',
  templateUrl: './food-choice.component.html',
  styleUrls: ['./food-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodChoiceComponent {
  @Input()
  choice: Choice

  @Output()
  foodChoiceAdded = new EventEmitter<OrderedFoodChoice>()

  submitFoodChoice(quantity: number) {
    const { name, description, price, currency } = this.choice
    this.foodChoiceAdded.emit({
      name,
      description,
      price,
      currency,
      quantity,
    })
  }
}
