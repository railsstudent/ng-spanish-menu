import { MenuItem } from '../interfaces'

export const MockData: MenuItem[] = [
  {
    id: '1',
    question: 'Which appetizer(s) do you wish to order?',
    choices: [
      {
        id: 'a',
        name: 'Egg salad',
        description: 'Egg salad',
        currency: 'USD',
        price: 4.99,
        quantity: 10,
        ingredients:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
      },
      {
        id: 'd',
        name: 'Buffalo Chicken Wings',
        description: 'Spicy chicken wings',
        currency: 'USD',
        price: 8.99,
        quantity: 10,
        ingredients:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
      },
      {
        id: 'b',
        name: 'Oven Baked Zucchini Chips',
        description: 'Oven Baked Zucchini Chips',
        currency: 'USD',
        price: 5.99,
        quantity: 10,
        ingredients:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
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
        currency: 'USD',
        price: 1.99,
        quantity: 10,
        ingredients:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
      },
      {
        id: 'b1',
        name: 'Tiramisu',
        description: 'Coffee Flavoured Dessert from Italy',
        currency: 'USD',
        price: 2.99,
        quantity: 10,
        ingredients:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
      },
    ],
  },
]

export const SoldOutMockData: MenuItem[] = [
  {
    id: '1',
    question: 'Which appetizer(s) do you wish to order?',
    choices: [
      {
        id: 'a',
        name: 'Egg salad',
        description: 'Egg salad',
        currency: 'USD',
        price: 4.99,
        quantity: 0,
        ingredients:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
      },
      {
        id: 'd',
        name: 'Buffalo Chicken Wings',
        description: 'Spicy chicken wings',
        currency: 'USD',
        price: 8.99,
        quantity: 0,
        ingredients:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
      },
      {
        id: 'b',
        name: 'Oven Baked Zucchini Chips',
        description: 'Oven Baked Zucchini Chips',
        currency: 'USD',
        price: 5.99,
        quantity: 0,
        ingredients:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
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
        currency: 'USD',
        price: 1.99,
        quantity: 0,
        ingredients:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
      },
      {
        id: 'b1',
        name: 'Tiramisu',
        description: 'Coffee Flavoured Dessert from Italy',
        currency: 'USD',
        price: 2.99,
        quantity: 0,
        ingredients:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
      },
    ],
  },
]
