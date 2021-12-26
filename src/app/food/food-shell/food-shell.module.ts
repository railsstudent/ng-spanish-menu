import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FoodMenuModule } from '../food-menu'
import { FoodTotalModule } from '../food-total'
import { FoodShellComponent } from './food-shell.component'

@NgModule({
  declarations: [FoodShellComponent],
  imports: [CommonModule, FoodTotalModule, FoodMenuModule],
  exports: [FoodShellComponent],
})
export class FoodShellModule {}
