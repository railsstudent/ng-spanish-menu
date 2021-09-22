import { moduleMetadata } from '@storybook/angular';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FoodService, FoodTotalComponent } from '@/food'
import { foodServiceFactory } from './mock';

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
