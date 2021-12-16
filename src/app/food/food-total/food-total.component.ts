import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { TotalCost } from '../interfaces'

@Component({
  selector: 'app-food-total',
  template: `
    <div class="flex flex-col p-2 box-border-indigo">
      <div class="selection">
        <button class="btn-indigo mr-2 mb-2" [disabled]="!isFoodOrdered" (click)="getCheck.emit(this.tip)">
          Give me the check
        </button>
        <p class="inline mr-2">Currency: {{ currency || '' }}</p>
        <form class="inline" [formGroup]="form">
          <label
            >Tip:
            <select class="pl-2 pr-8 py-1" name="tips" formControlName="tip">
              <option *ngFor="let tip of tips" [value]="tip">{{ tip }}%</option>
            </select>
          </label>
        </form>
      </div>
      <section class="total-section">
        <p class="inline mr-2">Subtotal: {{ totalBreakdown.subTotal }}</p>
        <p class="inline mr-2">Tip: {{ totalBreakdown.totalTip }}</p>
        <p class="inline mr-2 font-bold">Total: {{ totalBreakdown.total }}</p>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class FoodTotalComponent implements OnInit {
  // #region Properties (6)

  @Input()
  public currency: string
  @Output()
  public getCheck = new EventEmitter<number>()
  @Input()
  public isFoodOrdered: boolean
  @Input()
  public tips: number[]
  @Input()
  public totalBreakdown: TotalCost

  public form: FormGroup

  // #endregion Properties (6)

  // #region Constructors (1)

  constructor(private fb: FormBuilder) {}

  // #endregion Constructors (1)

  // #region Public Accessors (1)

  public get tip(): number {
    const cents = 100
    const control = this.form.get('tip') as FormControl
    if (!control) {
      return 0
    }

    return (control.value as number) / cents
  }

  // #endregion Public Accessors (1)

  // #region Public Methods (1)

  public ngOnInit(): void {
    this.form = this.fb.group({
      tip: new FormControl(this.tips[0], { validators: [Validators.required] }),
    })
  }

  // #endregion Public Methods (1)
}
