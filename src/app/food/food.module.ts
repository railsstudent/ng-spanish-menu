import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FoodCardModule } from './food-card'
import { FoodChoiceComponent } from './food-choice'
import { FoodChoiceFormModule } from './food-choice-form'
import { FoodMenuComponent } from './food-menu'
import { FoodMenuCardComponent } from './food-menu-card'
import { FoodMenuOptionsModule } from './food-menu-options'
import { FoodQuestionModule } from './food-question'
import { FoodRoutingModule } from './food-routing.module'
import { FoodShellComponent } from './food-shell'
import { FoodTotalModule } from './food-total'

@NgModule({
  declarations: [FoodChoiceComponent, FoodMenuComponent, FoodMenuCardComponent, FoodShellComponent],
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
  ],
})
export class FoodModule {}
