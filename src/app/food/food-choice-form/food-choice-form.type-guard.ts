import { FormGroup } from '@angular/forms'

import { FormValueQuantity } from './interfaces'

export function isFormValueQuantity(formGroup: FormGroup): formGroup is FormValueQuantity {
  return (
    formGroup !== undefined &&
    formGroup.value !== undefined &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    formGroup.value.quantity !== undefined &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    typeof formGroup.value.quantity === 'number'
  )
}
