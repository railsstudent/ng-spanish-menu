import { Pipe, PipeTransform } from '@angular/core'

import { MENU_OPTIONS } from '../enums'

@Pipe({
  name: 'renderMenuOption',
})
export class RenderOptionPipe implements PipeTransform {
  transform(value: MENU_OPTIONS): string {
    return MENU_OPTIONS[value].toLowerCase().replace('_', ' ')
  }
}
