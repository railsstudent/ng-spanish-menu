import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FoodChoiceComponent, FoodChoiceFormComponent } from '@/food'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

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

export const Primary = Template.bind({})
Primary.args = {
  choice: {
    id: '1',
    name: 'Vino Tinto',
    description: 'Red wine',
    currency: 'USD',
    price: 12.99,
    available: true,
  },
}

export const Soldout = Template.bind({})
Soldout.args = {
  choice: {
    id: '1',
    name: 'Vino tinto',
    description: 'Red wine',
    currency: 'USD',
    price: 12.99,
    available: false,
  },
}
