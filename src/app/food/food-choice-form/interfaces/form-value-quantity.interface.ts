import { FormGroup } from '@angular/forms'

export interface FormValueQuantity extends FormGroup {
  value: {
    quantity: number
  }
}
