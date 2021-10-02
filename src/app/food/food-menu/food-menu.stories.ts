import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { FoodMenuComponent } from './food-menu.component'
import { FoodService } from '../services'
import { FoodChoiceComponent } from '../food-choice'
import { FoodQuestionComponent } from '../food-question'
import { FoodChoiceFormComponent } from '../food-choice-form'
import { foodServiceFactory, MockData, SoldoutMockData } from '../storybook-mock'

export default {
  title: 'Food Menu',
  component: FoodMenuComponent,
  decorators: [
    moduleMetadata({
      declarations: [FoodChoiceComponent, FoodQuestionComponent, FoodChoiceFormComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [
        {
          provide: FoodService,
          useFactory: () => foodServiceFactory(MockData),
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

export const SoldoutMenu = Template.bind({})
SoldoutMenu.decorators = [
  moduleMetadata({
    providers: [
      {
        provide: FoodService,
        useFactory: () => foodServiceFactory(SoldoutMockData),
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
        useFactory: () => foodServiceFactory(),
      },
    ],
  }),
]
