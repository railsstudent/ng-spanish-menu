import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { action } from '@storybook/addon-actions'
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodChoiceComponent } from '../food-choice'
import { FoodChoiceFormComponent } from '../food-choice-form'
import { FoodQuestionComponent } from '../food-question'
import { FoodService } from '../services'
import { MockData, MockFoodService, SoldOutMockData } from '../storybook-mock'
import { FoodMenuCardComponent } from './food-menu-card.component'

export default {
  title: 'Food Menu Card',
  component: FoodMenuCardComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      declarations: [FoodQuestionComponent, FoodChoiceComponent, FoodChoiceFormComponent],
      providers: [
        {
          provide: FoodService,
          useFactory: () => new MockFoodService(MockData),
        },
      ],
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
      <app-food-choice [choice]="choice" [qtyMap]="qtyMap" (foodChoiceAdded)="foodChoiceAdded($event)"></app-food-choice>
    </ng-container>
  </app-food-menu-card>`,
})

const qtyMap = {
  [MockData[0].choices[0].id]: 10,
  [SoldOutMockData[0].choices[1].id]: 0,
}

export const Primary = FoodMenuCardTemplate.bind({})
Primary.args = {
  qtyMap,
  menuItem: {
    ...MockData[0],
    choices: [
      {
        ...MockData[0].choices[0],
      },
    ],
  },
}

export const Soldout = FoodMenuCardTemplate.bind({})
Soldout.args = {
  qtyMap,
  menuItem: {
    ...SoldOutMockData[0],
    choices: [{ ...SoldOutMockData[0].choices[1] }],
  },
}
Soldout.decorators = [
  moduleMetadata({
    providers: [
      {
        provide: FoodService,
        useFactory: () => new MockFoodService(SoldOutMockData),
      },
    ],
  }),
]
