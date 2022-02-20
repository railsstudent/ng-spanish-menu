import { Meta, Story } from '@storybook/angular'

import { MockData } from '../storybook-mock'
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
  choice: MockData[0].choices[0],
  remained: 10,
}
