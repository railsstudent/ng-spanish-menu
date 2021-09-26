import { MenuItem } from '@/food'
import { of } from 'rxjs'

export const foodServiceFactory = (menuItems?: MenuItem[]) => {
  return {
    getFood: () => of(menuItems),
    calculateTotal: (food: { price: number; quantity: number }[]): number => {
      const cents = 100
      const unroundedTotal = food.reduce((acc, choice) => {
        const { price, quantity } = choice
        return acc + price * quantity
      }, 0)

      return Math.round(unroundedTotal * cents) / cents
    },
  }
}
