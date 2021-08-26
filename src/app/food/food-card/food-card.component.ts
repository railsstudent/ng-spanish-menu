import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
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

  get total() {
    return Math.round(this.price * this.quantity * 100) / 100
  }
}
