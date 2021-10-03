import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FoodCardComponent } from './food-card'
import { FoodChoiceComponent } from './food-choice'
import { FoodChoiceFormComponent } from './food-choice-form'
import { FoodMenuComponent } from './food-menu'
import { FoodMenuCardComponent } from './food-menu-card'
import { FoodQuestionComponent } from './food-question'
import { FoodShellComponentComponent } from './food-shell-component'
import { FoodTotalComponent } from './food-total'

@NgModule({
  declarations: [
    FoodCardComponent,
    FoodQuestionComponent,
    FoodChoiceComponent,
    FoodMenuComponent,
    FoodMenuCardComponent,
    FoodTotalComponent,
    FoodChoiceFormComponent,
    FoodShellComponentComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FoodModule {}
