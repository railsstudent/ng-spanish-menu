import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { MenuOptions } from '../enums'

@Component({
  selector: 'app-food-menu-option',
  template: `
    <section class="flex justify-end p-3 pr-0" aria-label="select food section">
      <form [formGroup]="form" aria-label="select food form">
        <select class="pl-2 w-[200px] text-base" name="option" formControlName="option" aria-label="select food">
          <option value="all" aria-label="show all">Show all</option>
          <option value="available" aria-label="show available">Show available only</option>
          <option value="lowSupply" aria-label="show low supply">Show low supply</option>
          <option value="soldOut" aria-label="show sold out">Show sold out</option>
        </select>
      </form>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodMenuOptionsComponent implements OnInit, OnDestroy {
  // #region Properties (3)

  @Output()
  public menuOptionSelected = new EventEmitter<string>()

  public form: FormGroup
  unsubscribe$ = new Subject<boolean>()

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(private fb: FormBuilder) {}

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      option: new FormControl(MenuOptions.all),
    })

    this.form.controls['option'].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: string) => this.menuOptionSelected.emit(value))
  }

  // #endregion Public Methods (2)
}
