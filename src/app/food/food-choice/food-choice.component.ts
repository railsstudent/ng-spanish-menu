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

  @Input()
  qtyMap: Record<string, number> | undefined | null

  @Output()
  foodChoiceAdded = new EventEmitter<OrderedFoodChoice>()

  remained: number

  ngOnInit(): void {
    this.remained = this.qtyMap ? this.qtyMap[this.choice.id] || 0 : 0
  }

  submitFoodChoice(quantity: number) {
    const { id, name, description, price, currency } = this.choice
    if (this.remained - quantity >= 0) {
      this.foodChoiceAdded.emit({
        id,
        name,
        description,
        price,
        currency,
        quantity,
      })
    }
  }
}
