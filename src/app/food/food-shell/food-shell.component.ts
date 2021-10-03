import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-food-shell',
  templateUrl: './food-shell.component.html',
  styleUrls: ['./food-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodShellComponent {}
