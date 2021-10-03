import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Subject } from 'rxjs'
import { delay, map, takeUntil, tap } from 'rxjs/operators'

@Component({
  selector: 'app-food-choice-form',
  templateUrl: './food-choice-form.component.html',
  styleUrls: ['./food-choice-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodChoiceFormComponent implements OnInit, OnDestroy {
  @Output()
  foodChoiceSubmitted = new EventEmitter<number>()

  submitChoice$ = new Subject<Event>()
  unsubscribe$ = new Subject<boolean>()
  processing = false

  form = this.fb.group({
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.submitChoice$
      .pipe(
        tap(($event) => {
          $event.preventDefault()
          $event.stopPropagation()
          this.processing = true
        }),
        delay(1000),
        map(() => this.form.value),
        tap(() => (this.processing = false)),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(({ quantity }) => this.foodChoiceSubmitted.emit(quantity))
  }

  get quantity() {
    return this.form.get('quantity') as FormControl
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }
}
