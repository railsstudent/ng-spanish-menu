import { FoodService } from '../services'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodMenuComponent implements OnInit {
  constructor(private service: FoodService) {}

  ngOnInit(): void {
    this.service.getFood().then((menuItems) => {
      console.log(menuItems)
    })
  }
}
