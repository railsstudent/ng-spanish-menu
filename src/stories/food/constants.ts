import { MenuItem } from '@/food'

export const MockData: MenuItem[] = [
  {
    id: '1',
    question: 'Which appetizer(s) do you wish to order?',
    choices: [
      {
        id: 'a',
        name: 'Egg salad',
        description: 'Egg salad',
        price: 4.99,
      },
      {
        id: 'd',
        name: 'Buffalo Chicken Wings',
        description: 'Spicy chicken wings',
        price: 8.99,
      },
      {
        id: 'b',
        name: 'Oven Baked Zucchini Chips',
        description: 'Oven Baked Zucchini Chips',
        price: 5.99,
      },
    ],
  },
  {
    id: '2',
    question: 'Which dessert(s) do you wish to order?',
    choices: [
      {
        id: 'a1',
        name: 'Ice cream',
        description: 'Ice cream',
        price: 1.99,
      },
      {
        id: 'b1',
        name: 'Tiramisu',
        description: 'Coffee Flavoured Dessert from Italy',
        price: 2.99,
      },
    ],
  },
]