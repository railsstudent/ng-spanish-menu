import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FoodCardComponent } from './food-card.component'

@NgModule({
  declarations: [FoodCardComponent],
  imports: [CommonModule],
  exports: [FoodCardComponent],
})
export class FoodCardModule {}
