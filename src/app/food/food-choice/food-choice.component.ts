import { OrderedFoodChoice } from './interface'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-food-choice',
  templateUrl: './food-choice.component.html',
  styleUrls: ['./food-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodChoiceComponent {
  @Input()
  name: string

  @Input()
  description: string

  @Input()
  price: number

  @Output()
  foodChoiceAdded = new EventEmitter<OrderedFoodChoice>()

  form = this.fb.group({
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
  })

  constructor(private fb: FormBuilder) {}

  onSubmit($event: Event) {
    $event.preventDefault()
    $event.stopPropagation()
    this.foodChoiceAdded.emit({
      ...this.form.value,
      name: this.name,
      description: this.description,
      price: this.price,
    })
  }

  get quantity() {
    return this.form.get('quantity') as FormControl
  }
}
