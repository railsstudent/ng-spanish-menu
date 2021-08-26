// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FoodQuestionComponent } from '@/food'

export default {
  title: 'Food Question',
  component: FoodQuestionComponent,
} as Meta

const Template: Story<FoodQuestionComponent> = (args: FoodQuestionComponent) => ({
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  // name: 'Vino tinto',
  // description: 'Red wine',
  // price: 12.99,
  // quantity: 3
}
