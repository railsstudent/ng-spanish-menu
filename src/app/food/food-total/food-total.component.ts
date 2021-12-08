import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { TotalCost } from '../interfaces'

@Component({
  selector: 'app-food-total',
  template: `
    <div class="container">
      <div class="selection">
        <button [disabled]="!isFoodOrdered" (click)="getCheck.emit(this.tip)">Give me the check</button>
        <p class="currency">Currency: {{ currency || '' }}</p>
        <form class="form" [formGroup]="form">
          <label
            >Tip:
            <select name="tips" formControlName="tip">
              <option *ngFor="let tip of tips" [value]="tip">{{ tip }}%</option>
            </select>
          </label>
        </form>
      </div>
      <section class="total-section">
        <p>Subtotal: {{ totalBreakdown.subTotal }}</p>
        <p>Tip: {{ totalBreakdown.totalTip }}</p>
        <p class="total">Total: {{ totalBreakdown.total }}</p>
      </section>
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
        flex-direction: column;
      }

      form.form,
      p.currency {
        display: inline;
      }

      form.form select {
        padding: 0.25rem;
      }

      p.currency {
        margin-right: 0.5rem;
      }

      button {
        padding: 0.25rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .total-section p {
        display: inline;
        margin-right: 0.5rem;
      }

      .total-section p.total {
        font-weight: bold;
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
