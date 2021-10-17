import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodService } from '../services'
import { MockFoodService } from './../storybook-mock'
import { FoodTotalComponent } from './food-total.component'

export default {
  title: 'Food Total',
  component: FoodTotalComponent,
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: FoodService,
          useFactory: () => new MockFoodService(undefined),
        },
      ],
    }),
  ],
} as Meta

const Template: Story<FoodTotalComponent> = (args: FoodTotalComponent) => ({
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  choices: [
    {
      id: '1',
      name: 'Food 1',
      currency: 'USD',
      price: 1.99,
      description: 'Food 1 description',
      quantity: 1,
    },
    {
      id: '2',
      name: 'Food 2',
      currency: 'USD',
      price: 0.99,
      description: 'Food 2 description',
      quantity: 5,
    },
    {
      id: '3',
      name: 'Food 3',
      currency: 'USD',
      price: 2.99,
      description: 'Food 3 description',
      quantity: 2,
    },
  ],
}

export const NoOrder = Template.bind({})
NoOrder.args = {
  choices: [],
}
