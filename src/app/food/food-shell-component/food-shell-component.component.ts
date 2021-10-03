import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-food-shell-component',
  templateUrl: './food-shell-component.component.html',
  styleUrls: ['./food-shell-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodShellComponentComponent {}
