import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FoodChoiceComponent, FoodQuestionComponent, FoodMenuComponent, FoodService } from '@/food'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { of } from 'rxjs'
import { action } from '@storybook/addon-actions'
import { MockData } from './constants'

const foodServiceFactory = (url = '') => {
  return {
    getFood: () => of(url !== 'failed' ? MockData : undefined),
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
} as Meta

export const actionsData = {
  handleFoodChoice: action('handleFoodChoice'),
}

const Template: Story<FoodMenuComponent> = (args: FoodMenuComponent) => ({
  props: {
    ...args,
    ...actionsData,
  },
})

export const Menu = Template.bind({})

export const Empty = Template.bind({})
Empty.decorators = [
  moduleMetadata({
    providers: [
      {
        provide: FoodService,
        useFactory: () => foodServiceFactory('failed'),
      },
    ],
  }),
]
