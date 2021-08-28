import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodMenuComponent {
  // constructor() { }
  // ngOnInit(): void {
  // }
}
