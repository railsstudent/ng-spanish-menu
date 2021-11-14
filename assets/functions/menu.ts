import { Handler } from '@netlify/functions'

const data = {
  menu: [
    {
      id: '1',
      question: 'Which appetizer(s) do you wish to order?',
      choices: [
        {
          id: 'b',
          name: 'Tomato salad',
          description: 'Tomato salad',
          currency: 'USD',
          price: 4.99,
          available: true,
          quantity: 25,
          ingredients:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
        },
        {
          id: 'd',
          name: 'Buffalo Chicken Wings',
          description: 'Spicy chicken wings',
          currency: 'USD',
          price: 6.99,
          available: true,
          quantity: 30,
          ingredients:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
        },
        {
          id: 'e',
          name: 'Siu Mei',
          description: 'Chinese Dimsum',
          currency: 'USD',
          price: 3.99,
          available: true,
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
          id: 'b1',
          name: 'Tiramisu',
          description: 'Coffee Flavoured Dessert from Italy',
          currency: 'USD',
          price: 5.99,
          available: true,
          quantity: 30,
          ingredients:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
        },
        {
          id: 'c1',
          name: 'Gulab Jamun',
          description: 'Deep-fried sweets from India',
          currency: 'USD',
          price: 4.99,
          available: true,
          quantity: 35,
          ingredients:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
        },
        {
          id: 'd1',
          name: 'Lamingtons',
          description: 'square sponge cakes from Australia',
          currency: 'USD',
          price: 6.99,
          available: true,
          quantity: 40,
          ingredients:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dui in sapien posuere, eu condimentum urna fringilla. Donec cursus.',
        },
      ],
    },
  ],
}

const handler: Handler = async (event) => {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    }
  }

  return {
    statusCode: 500,
    body: `Unsupported http method: ${event.httpMethod}`,
  }
}

export { handler }
