import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { action } from '@storybook/addon-actions'
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodTotalComponent } from './food-total.component'

export default {
  title: 'Food Total',
  component: FoodTotalComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
} as Meta

const Template: Story<FoodTotalComponent> = (args: FoodTotalComponent) => ({
  props: {
    ...args,
    getCheck: action('getCheck'),
  },
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
  totalBreakdown: {
    subTotal: 10,
    totalTip: 2.75,
    total: 12.75,
  },
  tips: [0, 5, 10, 12.5, 15, 20],
}

export const NoOrder = Template.bind({})
NoOrder.args = {
  ...Primary.args,
  choices: [],
  totalBreakdown: {
    subTotal: 0,
    totalTip: 0,
    total: 0,
  },
}
