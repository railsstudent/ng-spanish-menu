import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { FoodShellComponent } from './food-shell'

const routes: Routes = [
  {
    path: '',
    component: FoodShellComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodRoutingModule {}
