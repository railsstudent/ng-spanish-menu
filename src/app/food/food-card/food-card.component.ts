import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodCardComponent {
  @Input()
  name: string

  @Input()
  description: string

  @Input()
  price: number

  @Input()
  quantity: number

  @Input()
  total: number
}
