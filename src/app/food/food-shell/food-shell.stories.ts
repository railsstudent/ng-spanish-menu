import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodChoiceComponent } from '../food-choice'
import { FoodChoiceFormComponent } from '../food-choice-form'
import { FoodMenuComponent } from '../food-menu/food-menu.component'
import { FoodMenuCardComponent } from '../food-menu-card'
import { FoodMenuOptionComponent } from '../food-menu-option'
import { FoodQuestionComponent } from '../food-question'
import { FoodTotalComponent } from '../food-total'
import { FoodService } from '../services'
import { MockData, MockFoodService } from '../storybook-mock'
import { FoodShellComponent } from './food-shell.component'

export default {
  title: 'Food Shell',
  component: FoodShellComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        FoodTotalComponent,
        FoodMenuComponent,
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
} as Meta

const Template: Story<FoodShellComponent> = (args: FoodShellComponent) => ({
  props: args,
})

export const Primary = Template.bind({})
