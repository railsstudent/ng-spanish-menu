import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodService } from '../services'
import { LowSupplyMockData, MockData, MockFoodService, SoldOutMockData } from '../storybook-mock'
import { FoodChoiceComponent } from './food-choice.component'
import { FoodChoiceModule } from './food-choice.module'

export default {
  title: 'Food Choice',
  component: FoodChoiceComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, FoodChoiceModule, FontAwesomeModule],
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
  [LowSupplyMockData[0].choices[2].id]: 1,
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

export const LowSupply = Template.bind({})
LowSupply.args = {
  choice: {
    ...LowSupplyMockData[0].choices[2],
    quantity: 1,
  },
  qtyMap,
}
LowSupply.decorators = [
  moduleMetadata({
    providers: [
      {
        provide: FoodService,
        useFactory: () => new MockFoodService(LowSupplyMockData),
      },
    ],
  }),
]
