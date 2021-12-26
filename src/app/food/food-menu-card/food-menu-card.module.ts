import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FoodMenuCardComponent } from './food-menu-card.component'

@NgModule({
  declarations: [FoodMenuCardComponent],
  imports: [CommonModule],
  exports: [FoodMenuCardComponent],
})
export class FoodMenuCardModule {}
