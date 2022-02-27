import { ReactiveFormsModule } from '@angular/forms'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { MENU_OPTIONS } from '../enums'
import { FoodMenuOptionsComponent } from './food-menu-options.component'

export default {
  title: 'Food Menu Options',
  component: FoodMenuOptionsComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
} as Meta

const FoodMenuOptionsTemplate: Story<FoodMenuOptionsComponent> = (args: FoodMenuOptionsComponent) => ({
  props: args,
})

export const Primary = FoodMenuOptionsTemplate.bind({})
Primary.args = {
  menuOption: MENU_OPTIONS.ALL,
}

export const Available = FoodMenuOptionsTemplate.bind({})
Available.args = {
  menuOption: MENU_OPTIONS.AVAILABLE,
}

export const SoldOut = FoodMenuOptionsTemplate.bind({})
SoldOut.args = {
  menuOption: MENU_OPTIONS.SOLD_OUT,
}

export const LowSupply = FoodMenuOptionsTemplate.bind({})
LowSupply.args = {
  menuOption: MENU_OPTIONS.LOW_SUPPLY,
}
