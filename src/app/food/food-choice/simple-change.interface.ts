export interface SimpleChangeQuantityMap {
  currentValue: { [key: string]: number }
  previousValue: { [key: string]: number }
  firstChange: boolean
  isFirstChange(): boolean
}
