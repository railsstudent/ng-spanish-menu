import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Choice, OrderedFoodChoice, Quantity } from '../interfaces'
import { FoodService } from '../services'

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

  remained$: Observable<Quantity>

  constructor(private service: FoodService) {}

  ngOnInit(): void {
    this.remained$ = this.service.quantityAvailableMap$.pipe(
      map((quatityAvailableMap) => {
        let qty = 0
        if (quatityAvailableMap) {
          qty = quatityAvailableMap[this.choice.id] || 0
        }
        return { qty }
      }),
    )
  }

  submitFoodChoice(quantity: number) {
    const { id, name, description, price, currency } = this.choice
    if (this.service.isEnoughQuantity(id, quantity)) {
      this.service.updateQuatity(id, quantity)
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
