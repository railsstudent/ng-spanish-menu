import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then((m) => m.FoodModule),
  },
  {
    path: '',
    redirectTo: 'food',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
