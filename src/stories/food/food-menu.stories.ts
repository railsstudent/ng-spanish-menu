import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { action } from '@storybook/addon-actions'
import { FoodChoiceComponent } from '@/food'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

export default {
  title: 'Food Menu',
  component: FoodChoiceComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
} as Meta

export const actionsData = {
  foodChoiceAdded: action('foodChoiceAdded'),
}

const Template: Story<FoodChoiceComponent> = (args: FoodChoiceComponent) => ({
  props: {
    ...args,
    ...actionsData,
  },
})

export const Primary = Template.bind({})
Primary.args = {
  name: 'Vino tinto',
  description: 'Red wine',
  price: 12.99,
}
