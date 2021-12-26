import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FoodChoiceFormModule } from '../food-choice-form'
import { FoodChoiceComponent } from './food-choice.component'

@NgModule({
  declarations: [FoodChoiceComponent],
  imports: [CommonModule, FoodChoiceFormModule],
  exports: [FoodChoiceComponent],
})
export class FoodChoiceModule {}
