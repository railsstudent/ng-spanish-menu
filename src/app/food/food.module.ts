import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FoodCardComponent } from './food-card'
import { FoodQuestionComponent } from './food-question'
import { FoodChoiceComponent } from './food-choice'
import { FoodMenuComponent } from './food-menu'
import { FoodMenuCardComponent } from './food-menu-card';
import { FoodTotalComponent } from './food-total'

@NgModule({
  declarations: [
    FoodCardComponent,
    FoodQuestionComponent,
    FoodChoiceComponent,
    FoodMenuComponent,
    FoodMenuCardComponent,
    FoodTotalComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FoodModule {}
