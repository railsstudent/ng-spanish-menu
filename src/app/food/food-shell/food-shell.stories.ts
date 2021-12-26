import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodChoiceComponent } from '../food-choice'
import { FoodChoiceFormModule } from '../food-choice-form'
import { FoodMenuComponent } from '../food-menu/food-menu.component'
import { FoodMenuCardComponent } from '../food-menu-card'
import { FoodMenuOptionsModule } from '../food-menu-options'
import { FoodQuestionModule } from '../food-question'
import { FoodTotalModule } from '../food-total'
import { FoodService } from '../services'
import { MockData, MockFoodService } from '../storybook-mock'
import { FoodShellComponent } from './food-shell.component'

export default {
  title: 'Food Shell',
  component: FoodShellComponent,
  decorators: [
    moduleMetadata({
      declarations: [FoodMenuComponent, FoodChoiceComponent, FoodMenuCardComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        FoodTotalModule,
        FoodMenuOptionsModule,
        FoodQuestionModule,
        FoodChoiceFormModule,
      ],
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
