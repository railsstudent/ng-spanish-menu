import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { OrderedFoodChoice } from '../interfaces'

@Component({
  selector: 'app-food-card',
  template: `
    <div class="flex flex-col w-[300px] rounded-xl box-border-indigo shadow-md shadow-indigo-500/50 mr-2">
      <label name="name" class="item card-row">
        <span class="field">Name:</span>
        <span class="hover:font-bold field-text">{{ ordered.name }}</span>
      </label>
      <label class="item card-row" name="description">
        <span class="field">Description:</span>
        <span class="hover:font-bold field-text">{{ ordered.description }}</span>
      </label>
      <label class="item card-row" name="price">
        <span class="field">Price:</span>
        <span class="hover:font-bold field-text">{{ ordered.currency }} {{ ordered.price }}</span>
      </label>
      <label class="item card-row" name="quantity">
        <span class="field">Quantity:</span>
        <span class="hover:font-bold field-text">{{ ordered.quantity }}</span>
      </label>
      <label class="item card-row" name="total">
        <span class="field">Total:</span>
        <span class="hover:font-bold field-text">{{ ordered.currency }} {{ total }}</span>
      </label>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .card-row {
        margin-bottom: 0.5rem;
        padding: 0.5rem 0.75rem;
        line-height: 1.5rem;
      }
    `,
  ],
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
