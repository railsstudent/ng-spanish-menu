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
        </select>
      </form>
      <pre>
      {{ form.value | json }}
    </pre
      >
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
  @Output()
  menuOptionSelected = new EventEmitter<string>()

  form: FormGroup
  unsubscribe$ = new Subject<boolean>()

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      option: new FormControl(MenuOptions.All),
    })

    this.form.controls['option'].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => this.menuOptionSelected.emit(value))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }
}
