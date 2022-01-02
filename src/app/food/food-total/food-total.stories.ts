import { action } from '@storybook/addon-actions'
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodTotalComponent } from './food-total.component'
import { FoodTotalModule } from './food-total.module'

export default {
  title: 'Food Total',
  component: FoodTotalComponent,
  decorators: [
    moduleMetadata({
      imports: [FoodTotalModule],
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
  isFoodOrdered: true,
  currency: 'USD',
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
  isFoodOrdered: false,
  totalBreakdown: {
    subTotal: 0,
    totalTip: 0,
    total: 0,
  },
}
