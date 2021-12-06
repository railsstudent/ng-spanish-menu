import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

import { FoodService } from '../services'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFormControl(formValue: any): formValue is number {
  return formValue !== null && formValue !== undefined && typeof formValue === 'number'
}

export function fulfillOrderValidator(choiceId: string, foodService: FoodService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const quantity = isFormControl(control.value) ? control.value : 0
    const quantityRemained = foodService.getQuantity(choiceId)
    const delta = quantityRemained - quantity
    return delta >= 0
      ? null
      : {
          notEnoughQuantity: {
            quantityRemained,
            quantity,
          },
        }
  }
}
