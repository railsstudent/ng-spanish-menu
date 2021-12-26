import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodChoiceFormModule } from '../food-choice-form'
import { FoodService } from '../services'
import { MockData, MockFoodService, SoldOutMockData } from '../storybook-mock'
import { FoodChoiceComponent } from './food-choice.component'

export default {
  title: 'Food Choice',
  component: FoodChoiceComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, FoodChoiceFormModule],
      declarations: [],
      providers: [
        {
          provide: FoodService,
          useFactory: () => new MockFoodService(MockData),
        },
      ],
    }),
  ],
  argTypes: { onClick: { action: 'clicked' } },
} as Meta

const Template: Story<FoodChoiceComponent> = (args: FoodChoiceComponent) => ({
  props: args,
})

const qtyMap = {
  [MockData[0].choices[0].id]: 10,
  [SoldOutMockData[0].choices[1].id]: 0,
}

export const Primary = Template.bind({})
Primary.args = {
  choice: {
    ...MockData[0].choices[0],
  },
  qtyMap,
}

export const SoldOut = Template.bind({})
SoldOut.args = {
  choice: {
    ...SoldOutMockData[0].choices[1],
    quantity: 0,
  },
  qtyMap,
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
