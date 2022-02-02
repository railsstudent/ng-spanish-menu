import { Pipe, PipeTransform } from '@angular/core'

import { MENU_OPTIONS } from '../enums'

@Pipe({
  name: 'renderMenuOption',
})
export class RenderOptionPipe implements PipeTransform {
  transform(value: MENU_OPTIONS): string {
    if (value === MENU_OPTIONS.AVAILABLE) {
      return 'available'
    } else if (value === MENU_OPTIONS.LOW_SUPPLY) {
      return 'low supply'
    }

    return 'sold out'
  }
}
