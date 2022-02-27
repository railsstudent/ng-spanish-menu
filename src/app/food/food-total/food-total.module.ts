import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FoodTotalComponent } from './food-total.component'

@NgModule({
  declarations: [FoodTotalComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FoodTotalComponent],
})
export class FoodTotalModule {}
