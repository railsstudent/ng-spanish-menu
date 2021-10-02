import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { action } from '@storybook/addon-actions'
import { moduleMetadata } from '@storybook/angular'
import { Meta, Story } from '@storybook/angular/types-6-0'

import { FoodChoiceComponent } from '../food-choice'
import { FoodChoiceFormComponent } from '../food-choice-form'
import { FoodQuestionComponent } from '../food-question'
import { FoodMenuCardComponent } from './food-menu-card.component'

export default {
  title: 'Food Menu Card',
  component: FoodMenuCardComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [FoodQuestionComponent, FoodChoiceComponent, FoodChoiceFormComponent],
    }),
  ],
} as Meta

const FoodMenuCardTemplate: Story<FoodMenuCardComponent> = (args: FoodMenuCardComponent) => ({
  props: {
    ...args,
    foodChoiceAdded: action('foodChoiceAdded'),
  },
  template: `<app-food-menu-card>
    <app-food-question [question]="menuItem.question" head></app-food-question>
    <ng-container *ngFor="let choice of menuItem.choices; index as j; trackBy: choiceTrackByFn" body>
      <app-food-choice [choice]="choice" (foodChoiceAdded)="foodChoiceAdded($event)"></app-food-choice>
    </ng-container>
  </app-food-menu-card>`,
})

export const Primary = FoodMenuCardTemplate.bind({})
Primary.args = {
  menuItem: {
    id: '1',
    question: 'Do you wish to order dessert?',
    choices: [
      {
        id: 'd',
        name: 'Buffalo Chicken Wings',
        description: 'Spicy chicken wings',
        currency: 'USD',
        price: 8.99,
        available: true,
      },
    ],
  },
}

export const Soldout = FoodMenuCardTemplate.bind({})
Soldout.args = {
  menuItem: {
    id: '1',
    question: 'Do you wish to order dessert?',
    choices: [
      {
        id: 'a',
        name: 'Egg salad',
        description: 'Egg salad',
        currency: 'USD',
        price: 4.99,
        available: false,
      },
    ],
  },
}
