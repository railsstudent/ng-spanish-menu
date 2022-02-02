import { Pipe, PipeTransform } from '@angular/core'

import { MENU_OPTIONS } from '../enums'

@Pipe({
  name: 'renderMenuOption',
})
export class RenderOptionPipe implements PipeTransform {
  transform(value: MENU_OPTIONS): string {
    if ([MENU_OPTIONS.ALL, MENU_OPTIONS.AVAILABLE].includes(value)) {
      return 'available'
    } else if (value === MENU_OPTIONS.LOW_SUPPLY) {
      return 'low supply'
    }

    return 'sold out'
  }
}
