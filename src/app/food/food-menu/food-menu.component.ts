import { FoodService } from '../services'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Choice, MenuItem } from '../interfaces'

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodMenuComponent implements OnInit {
  menuItems: MenuItem[]

  constructor(private service: FoodService) {}

  ngOnInit(): void {
    this.service.getFood().then((menuItems) => {
      console.log(menuItems)
      this.menuItems = menuItems
    })
  }

  trackByFn(index: number, menuItem: MenuItem): string | number {
    return menuItem ? menuItem.id : index
  }

  choiceTrackByFn(index: number, choice: Choice) {
    return choice ? choice.id : index
  }
}
