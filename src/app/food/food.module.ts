import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FoodCardComponent } from './food-card'
import { FoodQuestionComponent } from './food-question'
import { FoodChoiceComponent } from './food-choice'
import { FoodMenuComponent } from './food-menu'
@NgModule({
  declarations: [FoodCardComponent, FoodQuestionComponent, FoodChoiceComponent, FoodMenuComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FoodModule {}
