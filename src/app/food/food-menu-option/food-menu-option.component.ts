import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { MenuOptions } from '../enums'

@Component({
  selector: 'app-food-menu-option',
  template: `
    <section class="option">
      <form [formGroup]="form">
        <select name="option" formControlName="option">
          <option value="all">Show all</option>
          <option value="available">Show available only</option>
          <option value="soldOut">Show sold out</option>
        </select>
      </form>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      section.option {
        display: flex;
        justify-content: flex-end;
        padding: 0.75rem;
      }

      section select {
        padding: 0.25rem;
        font-size: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodMenuOptionComponent implements OnInit, OnDestroy {
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
