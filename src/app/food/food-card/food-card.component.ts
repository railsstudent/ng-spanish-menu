import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core'

import { OrderedFoodChoice } from '../interfaces'

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodCardComponent implements OnChanges {
  @Input()
  ordered: OrderedFoodChoice

  @Input()
  total: number

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
  }
}
