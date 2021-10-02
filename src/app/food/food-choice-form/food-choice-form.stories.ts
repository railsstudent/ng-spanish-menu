import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0'

import { FoodChoiceFormComponent } from './food-choice-form.component'

export default {
  title: 'Food Choice Form',
  component: FoodChoiceFormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
} as Meta

const Template: Story<FoodChoiceFormComponent> = (args: FoodChoiceFormComponent) => ({
  props: args,
})

export const Primary = Template.bind({})
