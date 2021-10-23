import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Subject } from 'rxjs'
import { delay, map, takeUntil, tap } from 'rxjs/operators'

import { Choice } from '../interfaces'
import { FoodService } from '../services'
import { fulfillOrderValidator } from '../validators'

@Component({
  selector: 'app-food-choice-form',
  templateUrl: './food-choice-form.component.html',
  styleUrls: ['./food-choice-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodChoiceFormComponent implements OnInit, OnDestroy {
  @Input()
  choice: Choice

  @Output()
  foodChoiceSubmitted = new EventEmitter<number>()

  submitChoice$ = new Subject<Event>()
  unsubscribe$ = new Subject<boolean>()
  processing = false

  form: FormGroup

  constructor(private fb: FormBuilder, private foodService: FoodService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      quantity: new FormControl(1, {
        validators: [Validators.required, Validators.min(1), fulfillOrderValidator(this.choice.id, this.foodService)],
        updateOn: 'blur',
      }),
    })

    this.submitChoice$
      .pipe(
        tap(($event) => {
          $event.preventDefault()
          $event.stopPropagation()
          this.processing = true
        }),
        delay(1000),
        map(() => this.form.value),
        map(({ quantity }) => +quantity),
        tap(() => (this.processing = false)),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((quantity) => this.foodChoiceSubmitted.emit(quantity))
  }

  get quantity(): FormControl | undefined {
    if (!this.form) {
      return undefined
    }
    return this.form.get('quantity') as FormControl
  }

  get quantityRemained(): number {
    return this.foodService.getQuantity(this.choice.id)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }
}
