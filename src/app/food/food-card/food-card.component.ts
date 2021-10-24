import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { OrderedFoodChoice } from '../interfaces'

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodCardComponent {
  @Input()
  ordered: OrderedFoodChoice

  @Input()
  total: number
}
