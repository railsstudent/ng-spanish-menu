import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function fulfillOrderValidator(quantityRemained: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const quantity = (control as FormControl).value || 0
    console.log('quantityRemained', quantityRemained, 'quantity', quantity)
    const delta = quantityRemained - quantity
    return delta >= 0
      ? null
      : {
          notEnoughQuantity: true,
          delta,
        }
  }
}
