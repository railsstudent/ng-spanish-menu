import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import { Choice, OrderedFoodChoice } from '../interfaces'

@Component({
  selector: 'app-food-choice',
  templateUrl: './food-choice.component.html',
  styleUrls: ['./food-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodChoiceComponent implements OnInit {
  @Input()
  choice: Choice

  @Output()
  foodChoiceAdded = new EventEmitter<OrderedFoodChoice>()

  quantityRemained = 0

  ngOnInit(): void {
    this.quantityRemained = this.choice.quantity
  }

  submitFoodChoice(quantity: number) {
    const { name, description, price, currency } = this.choice
    const nextQuantity = this.quantityRemained - quantity
    if (nextQuantity >= 0) {
      this.quantityRemained = nextQuantity
      this.foodChoiceAdded.emit({
        name,
        description,
        price,
        currency,
        quantity,
      })
    }
  }
}
