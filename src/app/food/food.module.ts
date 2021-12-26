import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FoodCardComponent } from './food-card'
import { FoodChoiceComponent } from './food-choice'
import { FoodChoiceFormComponent } from './food-choice-form'
import { FoodMenuComponent } from './food-menu'
import { FoodMenuCardComponent } from './food-menu-card'
import { FoodMenuOptionComponent } from './food-menu-option'
import { FoodQuestionComponent } from './food-question'
import { FoodRoutingModule } from './food-routing.module'
import { FoodShellComponent } from './food-shell'
import { FoodTotalModule } from './food-total/food-total.module'

@NgModule({
  declarations: [
    FoodCardComponent,
    FoodQuestionComponent,
    FoodChoiceComponent,
    FoodMenuComponent,
    FoodMenuCardComponent,
    FoodChoiceFormComponent,
    FoodShellComponent,
    FoodMenuOptionComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FoodRoutingModule, FoodTotalModule],
})
export class FoodModule {}
