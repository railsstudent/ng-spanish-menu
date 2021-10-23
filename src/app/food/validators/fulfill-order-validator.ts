import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms'

import { FoodService } from '../services'

export function fulfillOrderValidator(choiceId: string, foodService: FoodService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const quantity = (control as FormControl).value || 0
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
