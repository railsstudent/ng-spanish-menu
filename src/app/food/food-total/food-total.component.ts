import { Component, Input } from '@angular/core'
import { OrderedFoodChoice } from '../interfaces'

@Component({
  selector: 'app-food-total',
  template: `
    <div class="container">
      <button [disabled]="!choices || choices.length <= 0" (click)="calculate()">Give me the check</button>
      <div><span>Total of your bill: {{ total | currency }}</span></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .container {
        padding: 0.25rem;
        border: 1px solid black;
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

  calculate(): void {
    this.total = this.choices.reduce((acc, choice) => {
      const { price, quantity } = choice
      return acc + price * quantity
    }, 0)
  }
}
