import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodMenuOptionComponent } from './food-menu-option.component'

export default {
  title: 'Food Menu Option',
  component: FoodMenuOptionComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
} as Meta

const FoodMenuOptionTemplate: Story<FoodMenuOptionComponent> = (args: FoodMenuOptionComponent) => ({
  props: args,
})

export const Primary = FoodMenuOptionTemplate.bind({})
