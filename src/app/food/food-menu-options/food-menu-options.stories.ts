import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { MENE_OPTIONS } from '../enums'
import { FoodMenuOptionsComponent } from './food-menu-options.component'

export default {
  title: 'Food Menu Options',
  component: FoodMenuOptionsComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
} as Meta

const FoodMenuOptionsTemplate: Story<FoodMenuOptionsComponent> = (args: FoodMenuOptionsComponent) => ({
  props: args,
})

export const Primary = FoodMenuOptionsTemplate.bind({})

export const Available = FoodMenuOptionsTemplate.bind({})
Available.args = {
  menuOption: MENE_OPTIONS.AVAILABLE,
}

export const SoldOut = FoodMenuOptionsTemplate.bind({})
SoldOut.args = {
  menuOption: MENE_OPTIONS.SOLD_OUT,
}

export const LowSupply = FoodMenuOptionsTemplate.bind({})
LowSupply.args = {
  menuOption: MENE_OPTIONS.LOW_SUPPLY,
}
