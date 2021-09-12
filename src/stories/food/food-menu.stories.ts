import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FoodChoiceComponent, FoodQuestionComponent, FoodMenuComponent, FoodService } from '@/food'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { of } from 'rxjs'
import { MockData, SoldoutMockData } from './constants'

const foodServiceFactory = () => {
  return {
    getFood: () => of(MockData),
  }
}

const soldoutFoodServiceFactory = () => {
  return {
    getFood: () => of(SoldoutMockData),
  }
}

const emptyFoodServiceFactory = () => {
  return {
    getFood: () => of(undefined),
  }
}

export default {
  title: 'Food Menu',
  component: FoodMenuComponent,
  decorators: [
    moduleMetadata({
      declarations: [FoodChoiceComponent, FoodQuestionComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [
        {
          provide: FoodService,
          useFactory: () => foodServiceFactory(),
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
        useFactory: soldoutFoodServiceFactory,
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
        useFactory: emptyFoodServiceFactory,
      },
    ],
  }),
]
