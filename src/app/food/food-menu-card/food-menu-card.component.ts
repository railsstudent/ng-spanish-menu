import { Component } from '@angular/core'

@Component({
  selector: 'app-food-menu-card',
  template: `
  <div>
    <ng-content select="[head]"></ng-content>
    <ng-content select="[body]"></ng-content>
  </div>`,
})
export class FoodMenuCardComponent {}
