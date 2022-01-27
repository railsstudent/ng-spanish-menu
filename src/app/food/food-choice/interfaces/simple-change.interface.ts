import { Stock } from '../../interfaces'

export interface SimpleChangeQuantityMap {
  currentValue: { [key: string]: Stock }
  previousValue: { [key: string]: Stock }
  firstChange: boolean
  isFirstChange(): boolean
}
