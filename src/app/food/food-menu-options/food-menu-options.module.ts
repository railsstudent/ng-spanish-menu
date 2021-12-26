import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FoodMenuOptionsComponent } from './food-menu-options.component'

@NgModule({
  declarations: [FoodMenuOptionsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FoodMenuOptionsComponent],
})
export class FoodMenuOptionsModule {}
