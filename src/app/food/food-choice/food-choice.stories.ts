import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodChoiceFormComponent } from '../food-choice-form'
import { FoodService } from '../services'
import { MockData, MockFoodService } from '../storybook-mock'
import { SoldOutMockData } from './../storybook-mock/constants'
import { FoodChoiceComponent } from './food-choice.component'

export default {
  title: 'Food Choice',
  component: FoodChoiceComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      declarations: [FoodChoiceFormComponent],
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

export const Soldout = Template.bind({})
Soldout.args = {
  choice: {
    ...SoldOutMockData[0].choices[1],
    quantity: 0,
  },
  qtyMap,
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
