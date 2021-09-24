// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FoodCardComponent } from '@/food'

export default {
  title: 'Food Card',
  component: FoodCardComponent,
} as Meta

const Template: Story<FoodCardComponent> = (args: FoodCardComponent) => ({
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  ordered: {
    name: 'Vino tinto',
    description: 'Red wine 2016',
    price: 12.99,
    quantity: 3,
  },
  total: 38.97
}

export const LongDescription = Template.bind({})
LongDescription.args = {
  ordered: {
    name: 'Food with long description',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    price: 12.99,
    quantity: 3,
  },
  total: 38.97
}
