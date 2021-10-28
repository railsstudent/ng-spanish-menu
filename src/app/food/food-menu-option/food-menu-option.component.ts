import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-food-menu-option',
  templateUrl: './food-menu-option.component.html',
  styleUrls: ['./food-menu-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodMenuOptionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('FoodMenuOptionComponent')
  }
}
