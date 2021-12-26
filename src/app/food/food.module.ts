import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FoodRoutingModule } from './food-routing.module'
import { FoodShellModule } from './food-shell'

@NgModule({
  declarations: [],
  imports: [CommonModule, FoodRoutingModule, FoodShellModule],
})
export class FoodModule {}
