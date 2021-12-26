import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FoodCardModule } from './food-card'
import { FoodChoiceModule } from './food-choice'
import { FoodChoiceFormModule } from './food-choice-form'
import { FoodMenuModule } from './food-menu'
import { FoodMenuCardModule } from './food-menu-card'
import { FoodMenuOptionsModule } from './food-menu-options'
import { FoodQuestionModule } from './food-question'
import { FoodRoutingModule } from './food-routing.module'
import { FoodShellModule } from './food-shell'
import { FoodTotalModule } from './food-total'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FoodRoutingModule,
    FoodTotalModule,
    FoodCardModule,
    FoodMenuOptionsModule,
    FoodQuestionModule,
    FoodChoiceFormModule,
    FoodChoiceModule,
    FoodMenuCardModule,
    FoodMenuModule,
    FoodShellModule,
  ],
})
export class FoodModule {}
