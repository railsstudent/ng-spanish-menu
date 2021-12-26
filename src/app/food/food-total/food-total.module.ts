import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FoodTotalComponent } from './food-total.component'

@NgModule({
  declarations: [FoodTotalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FoodTotalComponent],
})
export class FoodTotalModule {}
