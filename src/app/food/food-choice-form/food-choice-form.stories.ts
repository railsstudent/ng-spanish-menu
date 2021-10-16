import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0'

import { FoodService } from '../services'
import { MockData, MockFoodService, SoldOutMockData } from '../storybook-mock'
import { FoodChoiceFormComponent } from './food-choice-form.component'

export default {
  title: 'Food Choice Form',
  component: FoodChoiceFormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [
        {
          provide: FoodService,
          useFactory: () => new MockFoodService(MockData),
        },
      ],
    }),
  ],
} as Meta

const Template: Story<FoodChoiceFormComponent> = (args: FoodChoiceFormComponent) => ({
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  choice: MockData[0].choices[0],
}

export const DisableSubmit = Template.bind({})
DisableSubmit.args = {
  choice: SoldOutMockData[0].choices[0],
}
DisableSubmit.decorators = [
  moduleMetadata({
    providers: [
      {
        provide: FoodService,
        useFactory: () => new MockFoodService(SoldOutMockData),
      },
    ],
  }),
]
