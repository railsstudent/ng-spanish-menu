import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'

import { Choice, OrderedFoodChoice } from '../interfaces'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCurrentValueObjectLiteral(currentValue: any): currentValue is { [key: string]: number } {
  return currentValue !== undefined && typeof currentValue === 'object' && !(currentValue instanceof Array)
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
    const { qtyMap = null } = changes
    const { currentValue = null } = qtyMap || {}
    if (isCurrentValueObjectLiteral(currentValue)) {
      this.remained = currentValue[this.choice.id]
    }
  }

  public ngOnInit(): void {
    this.remained = this.qtyMap ? this.qtyMap[this.choice.id] || 0 : 0
  }

  public submitFoodChoice(quantity: number): void {
    const { id, name, description, price, currency } = this.choice
    if (this.remained - quantity >= 0) {
      this.foodChoiceAdded.emit({
        id,
        name,
        description,
        price,
        currency,
        quantity,
      })
    }
  }

  // #endregion Public Methods (3)
}
