import { MenuItem } from "@/food"
import { of } from "rxjs"

export const foodServiceFactory = (menuItems?: MenuItem[]) => {
  return {
    getFood: () => of(menuItems),
  }
}
