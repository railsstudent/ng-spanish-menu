import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FoodMenuCardComponent } from '@/food'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

export default {
  title: 'Food Menu Card',
  component: FoodMenuCardComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
  argTypes: { onClick: { action: 'clicked' } },
} as Meta

const Template: Story<FoodMenuCardComponent> = (args: FoodMenuCardComponent) => ({
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {}
