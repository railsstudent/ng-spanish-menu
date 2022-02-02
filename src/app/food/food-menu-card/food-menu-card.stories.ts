import { HttpClientModule } from '@angular/common/http'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { action } from '@storybook/addon-actions'
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodChoiceModule } from '../food-choice'
import { FoodQuestionComponent } from '../food-question/food-question.component'
import { Stock } from '../interfaces'
import { FoodService } from '../services'
import { MockData, MockFoodService, SoldOutMockData } from '../storybook-mock'
import { FoodMenuCardComponent } from './food-menu-card.component'

export default {
  title: 'Food Menu Card',
  component: FoodMenuCardComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, FoodChoiceModule],
      declarations: [FoodQuestionComponent],
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

const qtyMap: Record<string, Stock> = {
  [MockData[0].choices[0].id]: { quantity: 10, totalStock: 10, isLowSupply: false },
  [SoldOutMockData[0].choices[1].id]: { quantity: 0, totalStock: 10, isLowSupply: true },
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

export const SoldOut = FoodMenuCardTemplate.bind({})
SoldOut.args = {
  qtyMap,
  menuItem: {
    ...SoldOutMockData[0],
    choices: [{ ...SoldOutMockData[0].choices[1] }],
  },
}
SoldOut.decorators = [
  moduleMetadata({
    providers: [
      {
        provide: FoodService,
        useFactory: () => new MockFoodService(SoldOutMockData),
      },
    ],
  }),
]
