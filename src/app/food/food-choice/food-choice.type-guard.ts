import { SimpleChange } from '@angular/core'

import { SimpleChangeQuantityMap } from './interfaces'

export function isQtyMapCurrentValueObjectLiteral(qtyMap: SimpleChange): qtyMap is SimpleChangeQuantityMap {
  return (
    qtyMap !== undefined &&
    typeof qtyMap.firstChange === 'boolean' &&
    qtyMap.currentValue !== undefined &&
    typeof qtyMap.currentValue === 'object' &&
    !(qtyMap.currentValue instanceof Array)
  )
}
