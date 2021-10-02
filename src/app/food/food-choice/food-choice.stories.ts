import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FoodChoiceComponent } from './food-choice.component'
import { FoodChoiceFormComponent } from '../food-choice-form'

export default {
  title: 'Food Choice',
  component: FoodChoiceComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [FoodChoiceFormComponent],
    }),
  ],
  argTypes: { onClick: { action: 'clicked' } },
} as Meta

const Template: Story<FoodChoiceComponent> = (args: FoodChoiceComponent) => ({
  props: args,
})

const defaultChoice = {
  id: '1',
  name: 'Vino Tinto',
  description: 'Red wine',
  currency: 'USD',
  price: 12.99,
}

export const Primary = Template.bind({})
Primary.args = {
  choice: {
    ...defaultChoice,
    available: true,
  },
}

export const Soldout = Template.bind({})
Soldout.args = {
  choice: {
    ...defaultChoice,
    available: false,
  },
}
