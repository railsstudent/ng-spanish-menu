import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodChoiceComponent } from '../food-choice'
import { FoodChoiceFormComponent } from '../food-choice-form'
import { FoodMenuCardComponent } from '../food-menu-card'
import { FoodMenuOptionComponent } from '../food-menu-option'
import { FoodQuestionComponent } from '../food-question'
import { FoodService } from '../services'
import { MockData, MockFoodService, SoldOutMockData } from '../storybook-mock'
import { FoodMenuComponent } from './food-menu.component'

export default {
  title: 'Food Menu',
  component: FoodMenuComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        FoodChoiceComponent,
        FoodQuestionComponent,
        FoodChoiceFormComponent,
        FoodMenuCardComponent,
        FoodMenuOptionComponent,
      ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [
        {
          provide: FoodService,
          useFactory: () => new MockFoodService(MockData),
        },
      ],
    }),
  ],
  argTypes: { onClick: { action: 'clicked' } },
} as Meta

const Template: Story<FoodMenuComponent> = (args: FoodMenuComponent) => ({
  props: args,
})

export const Menu = Template.bind({})

export const SoldOutMenu = Template.bind({})
SoldOutMenu.decorators = [
  moduleMetadata({
    providers: [
      {
        provide: FoodService,
        useFactory: () => new MockFoodService(SoldOutMockData),
      },
    ],
  }),
]

export const Empty = Template.bind({})
Empty.decorators = [
  moduleMetadata({
    providers: [
      {
        provide: FoodService,
        useFactory: () => new MockFoodService(),
      },
    ],
  }),
]
