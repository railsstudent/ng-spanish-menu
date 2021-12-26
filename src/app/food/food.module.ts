import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FoodCardModule } from './food-card'
import { FoodChoiceComponent } from './food-choice'
import { FoodChoiceFormComponent } from './food-choice-form'
import { FoodMenuComponent } from './food-menu'
import { FoodMenuCardComponent } from './food-menu-card'
import { FoodMenuOptionsModule } from './food-menu-options'
import { FoodQuestionComponent } from './food-question'
import { FoodRoutingModule } from './food-routing.module'
import { FoodShellComponent } from './food-shell'
import { FoodTotalModule } from './food-total'

@NgModule({
  declarations: [
    FoodQuestionComponent,
    FoodChoiceComponent,
    FoodMenuComponent,
    FoodMenuCardComponent,
    FoodChoiceFormComponent,
    FoodShellComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FoodRoutingModule,
    FoodTotalModule,
    FoodCardModule,
    FoodMenuOptionsModule,
  ],
})
export class FoodModule {}
