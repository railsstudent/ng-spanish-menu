import { OrderedFoodChoice } from './interface'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Subject } from 'rxjs'
import { delay, map, takeUntil, tap } from 'rxjs/operators'

@Component({
  selector: 'app-food-choice',
  templateUrl: './food-choice.component.html',
  styleUrls: ['./food-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodChoiceComponent implements OnInit, OnDestroy {
  @Input()
  name: string

  @Input()
  description: string

  @Input()
  price: number

  @Output()
  foodChoiceAdded = new EventEmitter<OrderedFoodChoice>()

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
        map(() => ({
          ...this.form.value,
          name: this.name,
          description: this.description,
          price: this.price,
        })),
        tap(() => (this.processing = false)),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((value) => this.foodChoiceAdded.emit(value))
  }

  get quantity() {
    return this.form.get('quantity') as FormControl
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }
}
