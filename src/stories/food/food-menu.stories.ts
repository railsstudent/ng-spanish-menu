import { moduleMetadata } from '@storybook/angular'
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0'
import { FoodChoiceComponent, FoodQuestionComponent, FoodMenuComponent, FoodService } from '@/food'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { of } from 'rxjs'

const MockData = [
  {
    id: '1',
    question: 'Which appetizer(s) do you wish to order?',
    choices: [
      {
        id: 'a',
        name: 'Egg salad',
        description: 'Egg salad',
        price: 4.99,
      },
      {
        id: 'd',
        name: 'Buffalo Chicken Wings',
        description: 'Spicy chicken wings',
        price: 8.99,
      },
    ],
  },
  {
    id: '2',
    question: 'Which dessert(s) do you wish to order?',
    choices: [
      {
        id: 'a1',
        name: 'Ice cream',
        description: 'Ice cream',
        price: 1.99,
      },
      {
        id: 'b1',
        name: 'Tiramisu',
        description: 'Coffee Flavoured Dessert from Italy',
        price: 2.99,
      },
    ],
  },
]

const foodServiceFactory = () => {
  return {
    getFood: () => of(MockData),
  }
}

export default {
  title: 'Food Menu',
  component: FoodMenuComponent,
  subcomponents: {
    FoodChoiceComponent,
    FoodQuestionComponent,
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [
        {
          provide: FoodService,
          useFactory: foodServiceFactory,
        },
      ],
    }),
  ],
} as Meta

const Template: Story<FoodMenuComponent> = (args: FoodMenuComponent) => ({
  props: args,
  moduleMetadata: {
    declarations: [FoodChoiceComponent, FoodQuestionComponent],
  },
})

export const MockedSuccess = Template.bind({})
