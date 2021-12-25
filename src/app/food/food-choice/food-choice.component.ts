import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core'

import { Choice, OrderedFoodChoice, SimpleChangeQuantityMap } from '../interfaces'

function isQtyMapCurrentValueObjectLiteral(qtyMap: SimpleChange): qtyMap is SimpleChangeQuantityMap {
  return (
    qtyMap !== undefined &&
    typeof qtyMap.firstChange === 'boolean' &&
    qtyMap.currentValue !== undefined &&
    typeof qtyMap.currentValue === 'object' &&
    !(qtyMap.currentValue instanceof Array)
  )
}
@Component({
  selector: 'app-food-choice',
  templateUrl: './food-choice.component.html',
  styleUrls: ['./food-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodChoiceComponent implements OnInit, OnChanges {
  // #region Properties (4)

  @Input()
  public choice: Choice
  @Output()
  public foodChoiceAdded = new EventEmitter<OrderedFoodChoice>()
  @Input()
  public qtyMap: Record<string, number> | undefined | null
  public remained: number

  // #endregion Properties (4)

  // #region Public Methods (3)

  public ngOnChanges(changes: SimpleChanges): void {
    const { qtyMap } = changes
    if (isQtyMapCurrentValueObjectLiteral(qtyMap)) {
      this.remained = qtyMap.currentValue[this.choice.id]
    } else {
      this.remained = 0
    }
  }

  public ngOnInit(): void {
    this.remained = this.qtyMap ? this.qtyMap[this.choice.id] || 0 : 0
  }

  public submitFoodChoice(newQuantity: number): void {
    const { ingredients, quantity, ...rest } = this.choice
    if (this.remained - newQuantity >= 0) {
      this.foodChoiceAdded.emit({
        ...rest,
        quantity: newQuantity,
      })
    }
  }

  // #endregion Public Methods (3)
}
