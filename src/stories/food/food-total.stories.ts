// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FoodTotalComponent } from '@/food'

export default {
  title: 'Food Total',
  component: FoodTotalComponent,
} as Meta

const Template: Story<FoodTotalComponent> = (args: FoodTotalComponent) => ({
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  choices: [
    {
      name: 'Food 1',
      price: 1.99,
      description: 'Food 1 description',
      quantity: 1
    },
    {
      name: 'Food 2',
      price: 0.99,
      description: 'Food 2 description',
      quantity: 5
    },
    {
      name: 'Food 3',
      price: 2.99,
      description: 'Food 3 description',
      quantity: 2
    }
  ]
}

export const NoOrder = Template.bind({})
NoOrder.args = {
  choices: []
}
