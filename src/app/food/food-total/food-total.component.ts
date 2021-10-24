import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { OrderedFoodChoice } from '../interfaces'
import { FoodService } from '../services'

@Component({
  selector: 'app-food-total',
  template: `
    <div class="container">
      <button [disabled]="!choices || choices.length <= 0" (click)="calculate()">Give me the check</button>
      <form class="form" [formGroup]="form">
        <label
          >Tip:
          <select name="tips" formControlName="tip">
            <option *ngFor="let tip of tips" [value]="tip">{{ tip }}%</option>
          </select>
        </label>
      </form>
      <div>
        <span class="total">Currency: {{ choices?.[0]?.currency || '' }}</span>
        <span class="total">Total before tip: {{ totalBeforeTip }}</span>
        <span class="total">Tip: {{ totalTip }}</span>
        <span class="total">Total: {{ total }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .container {
        padding: 0.5rem;
        border: 1px solid black;
        display: flex;
        align-items: center;
      }

      form.form,
      span.total {
        margin-right: 0.5rem;
      }

      form.form select {
        padding: 0.25rem;
      }

      button {
        margin-right: 0.5rem;
        margin-bottom: 0.25rem;
      }
    `,
  ],
})
export class FoodTotalComponent implements OnInit {
  @Input()
  choices: OrderedFoodChoice[] = []

  @Input()
  tips: number[]

  form: FormGroup
  total = 0
  totalTip = 0
  totalBeforeTip = 0

  constructor(private fb: FormBuilder, private foodService: FoodService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tip: new FormControl(this.tips[0], { validators: [Validators.required] }),
    })
  }

  get tip(): number {
    const cents = 100
    const control = this.form.get('tip') as FormControl
    if (!control) {
      return 0
    }

    return (control.value as number) / cents
  }

  calculate(): void {
    const { total, totalTip, totalBeforeTip } = this.foodService.calculateTotal(this.choices, this.tip)
    this.totalBeforeTip = totalBeforeTip
    this.totalTip = totalTip
    this.total = total
  }
}
