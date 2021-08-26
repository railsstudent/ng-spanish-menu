// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FoodChoiceComponent } from '@/food'

export default {
  title: 'Food Choice',
  component: FoodChoiceComponent,
} as Meta

const Template: Story<FoodChoiceComponent> = (args: FoodChoiceComponent) => ({
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  // name: 'Vino tinto',
  // description: 'Red wine',
  // price: 12.99,
  // quantity: 3
}
