import { Pipe, PipeTransform } from '@angular/core'

import { MENE_OPTIONS } from '../enums'

@Pipe({
  name: 'renderMenuOption',
})
export class RenderOptionPipe implements PipeTransform {
  transform(value: MENE_OPTIONS): string {
    if ([MENE_OPTIONS.ALL, MENE_OPTIONS.AVAILABLE].includes(value)) {
      return 'available'
    } else if (value === MENE_OPTIONS.LOW_SUPPLY) {
      return 'low supply'
    }

    return 'sold out'
  }
}
