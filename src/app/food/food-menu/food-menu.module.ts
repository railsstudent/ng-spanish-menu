import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FoodChoiceModule } from '../food-choice'
import { FoodMenuCardModule } from '../food-menu-card'
import { FoodMenuOptionsModule } from '../food-menu-options'
import { FoodQuestionModule } from '../food-question'
import { FoodMenuComponent } from './food-menu.component'

@NgModule({
  declarations: [FoodMenuComponent],
  imports: [CommonModule, FoodQuestionModule, FoodMenuCardModule, FoodMenuOptionsModule, FoodChoiceModule],
  exports: [FoodMenuComponent],
})
export class FoodMenuModule {}
