import { Component, Input } from '@angular/core'

import { Choice } from '../interfaces'

@Component({
  selector: 'app-food-choice-description',
  template: `
    <ng-container>
      <div class="row">
        <label name="name" class="item">
          <span class="field">Name:</span>
          <span class="field-text">{{ choice.name }}</span>
        </label>
        <label name="description" class="item">
          <span class="field">Description:</span>
          <span class="field-text">{{ choice.description }}</span>
        </label>
        <label name="price" class="item">
          <span class="field">Price:</span>
          <span class="field-text">{{ choice.currency }} {{ choice.price }}</span>
        </label>
        <label name="quantity" class="item">
          <span class="field">Quantity:</span>
          <span class="field-text">{{ remained }}</span>
        </label>
      </div>
      <div class="row">
        <label name="ingredient" class="item">
          <span class="field">Ingredients:</span>
          <span class="field-text italic">{{ choice.ingredients }}</span>
        </label>
      </div>
    </ng-container>
  `,
  styleUrls: ['./food-choice-description.component.scss'],
})
export class FoodChoiceDescriptionComponent {
  @Input()
  choice: Choice

  @Input()
  remained: number
}
