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

export const Drink = Template.bind({})
Drink.args = {
  question: 'What drink do you wish to order?',
}

export const Food = Template.bind({})
Food.args = {
  question:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book?",
}
