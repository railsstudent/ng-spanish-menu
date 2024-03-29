import { Meta, Story } from '@storybook/angular'

import { FoodQuestionComponent } from './food-question.component'

export default {
  title: 'Food Question',
  component: FoodQuestionComponent,
} as Meta

const Template: Story<FoodQuestionComponent> = (args: FoodQuestionComponent) => ({
  props: args,
})

export const SimpleQuestion = Template.bind({})
SimpleQuestion.args = {
  question: 'Which drink do you wish to order?',
}

export const LongQuestion = Template.bind({})
LongQuestion.args = {
  question:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book?",
}
