import { HttpClientModule } from '@angular/common/http'
import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { FoodService } from '../services'
import { MockData, MockFoodService, SoldOutMockData } from '../storybook-mock'
import { FoodShellComponent } from './food-shell.component'
import { FoodShellModule } from './food-shell.module'

export default {
  title: 'Food Shell',
  component: FoodShellComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [HttpClientModule, FoodShellModule],
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

export const SoldOut = Template.bind({})
SoldOut.decorators = [
  moduleMetadata({
    providers: [
      {
        provide: FoodService,
        useFactory: () => new MockFoodService(SoldOutMockData),
      },
    ],
  }),
]
