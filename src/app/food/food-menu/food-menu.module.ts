import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FoodChoiceModule } from '../food-choice'
import { FoodMenuCardComponent } from '../food-menu-card'
import { FoodMenuOptionsComponent } from '../food-menu-options'
import { FoodQuestionComponent } from '../food-question'
import { FoodMenuComponent } from './food-menu.component'
import { RenderOptionPipe } from './render-menu-option.pipe'

@NgModule({
  declarations: [
    FoodMenuComponent,
    FoodQuestionComponent,
    FoodMenuCardComponent,
    FoodMenuOptionsComponent,
    RenderOptionPipe,
  ],
  imports: [CommonModule, FoodChoiceModule, FormsModule, ReactiveFormsModule],
  exports: [FoodMenuComponent],
})
export class FoodMenuModule {}
