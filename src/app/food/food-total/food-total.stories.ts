import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0'

import { FoodService } from '../services'
import { foodServiceFactory } from '../storybook-mock'
import { FoodTotalComponent } from './food-total.component'

export default {
  title: 'Food Total',
  component: FoodTotalComponent,
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: FoodService,
          useFactory: () => foodServiceFactory(),
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
      name: 'Food 1',
      currency: 'USD',
      price: 1.99,
      description: 'Food 1 description',
      quantity: 1,
    },
    {
      name: 'Food 2',
      currency: 'USD',
      price: 0.99,
      description: 'Food 2 description',
      quantity: 5,
    },
    {
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
