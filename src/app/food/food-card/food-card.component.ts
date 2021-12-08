import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { OrderedFoodChoice } from '../interfaces'

@Component({
  selector: 'app-food-card',
  template: `
    <div class="container">
      <label name="name" class="item">
        <span class="field">Name:</span>
        <span>{{ ordered.name }}</span>
      </label>
      <label class="item" name="description">
        <span class="field">Description:</span>
        <span>{{ ordered.description }}</span>
      </label>
      <label class="item" name="price">
        <span class="field">Price:</span>
        <span>{{ ordered.price }}</span>
      </label>
      <label class="item" name="quantity">
        <span class="field">Quantity:</span>
        <span>{{ ordered.quantity }}</span>
      </label>
      <label class="item" name="total">
        <span class="field">Total:</span>
        <span>{{ ordered.currency }} {{ total }}</span>
      </label>
    </div>
  `,
  styleUrls: ['./food-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodCardComponent {
  // #region Properties (2)

  @Input()
  public ordered: OrderedFoodChoice
  @Input()
  public total: number

  // #endregion Properties (2)
}
