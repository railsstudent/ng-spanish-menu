// import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0'

import { FoodChoiceFormComponent } from '../food-choice-form'
import { Choice } from '../interfaces'
import { FoodChoiceComponent } from './food-choice.component'

export default {
  title: 'Food Choice',
  component: FoodChoiceComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [FoodChoiceFormComponent],
    }),
  ],
  argTypes: { onClick: { action: 'clicked' } },
} as Meta

const Template: Story<FoodChoiceComponent> = (args: FoodChoiceComponent) => ({
  props: args,
})

const defaultChoice: Choice = {
  id: '1',
  name: 'Vino Tinto xxxxxxxxxxxxxxx yyyyyyyyyyy ddffff adadasdasdas vvvvv ooo',
  description: 'Red wine',
  currency: 'USD',
  price: 12.99,
  quantity: 10,
}

const qtyMap = {
  '1': 10,
  '2': 0,
}

export const Primary = Template.bind({})
Primary.args = {
  choice: {
    ...defaultChoice,
  },
  qtyMap,
}

export const Soldout = Template.bind({})
Soldout.args = {
  choice: {
    ...defaultChoice,
    quantity: 0,
    id: '2',
  },
  qtyMap,
}
