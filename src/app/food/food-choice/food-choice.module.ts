import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FoodChoiceFormComponent } from '../food-choice-form'
import { FoodChoiceComponent } from './food-choice.component'

@NgModule({
  declarations: [FoodChoiceComponent, FoodChoiceFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FoodChoiceComponent],
})
export class FoodChoiceModule {}
