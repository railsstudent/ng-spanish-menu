import { Meta, Story } from '@storybook/angular'

import { FoodChoiceDescriptionComponent } from './food-choice-description.component'

export default {
  title: 'Food Choice Description',
  component: FoodChoiceDescriptionComponent,
} as Meta

const Template: Story<FoodChoiceDescriptionComponent> = (args: FoodChoiceDescriptionComponent) => ({
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  choice: {
    id: 'a',
    name: 'Egg salad',
    description: 'Egg salad',
    currency: 'USD',
    price: 4.99,
    quantity: 10,
    ingredients:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
  },
  remained: 10,
}

export const ChoiceLongDescription = Template.bind({})
ChoiceLongDescription.args = {
  choice: {
    id: 'a',
    name: 'Egg salad',
    description: 'Egg salad',
    currency: 'USD',
    price: 4.99,
    quantity: 10,
    ingredients:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean odio elit, auctor a felis ut, fringilla tempus ligula. Nullam non mollis augue. Nullam sed velit ultrices, tincidunt felis at, luctus purus. Proin tincidunt auctor enim. Cras nulla neque, gravida sit amet pretium ut, tristique sit amet dui. Mauris placerat varius ex nec iaculis. Nunc at faucibus lectus, quis gravida lorem. In interdum at turpis nec semper. Vivamus vel sapien felis. Vivamus non mi in quam imperdiet consectetur. Mauris eros ex.',
  },
  remained: 10,
}
