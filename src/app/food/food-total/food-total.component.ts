import { Component, Input } from '@angular/core'
import { OrderedFoodChoice } from '../interfaces'
import { FoodService } from '../services'

@Component({
  selector: 'app-food-total',
  template: `
    <div class="container">
      <button [disabled]="!choices || choices.length <= 0" (click)="calculate()">Give me the check</button>
      <div><span>Total: USD {{ total }}</span></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .container {
        padding: 0.5rem;
        border: 1px solid black;
        display: flex;
      }

      button {
        margin-right: 0.5rem;
        margin-bottom: 0.25rem;
      }
    `,
  ],
})
export class FoodTotalComponent {
  @Input()
  choices: OrderedFoodChoice[] = []

  total = 0

  constructor(private foodService: FoodService) {}

  calculate(): void {
    this.total = this.foodService.calculateTotal(this.choices)
  }
}
