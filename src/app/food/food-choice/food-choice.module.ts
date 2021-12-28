import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FoodChoiceFormModule } from '../food-choice-form'
import { FoodChoiceComponent } from './food-choice.component'
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [FoodChoiceComponent],
  imports: [CommonModule, FoodChoiceFormModule /*FontAwesomeModule*/],
  exports: [FoodChoiceComponent],
})
export class FoodChoiceModule {}
