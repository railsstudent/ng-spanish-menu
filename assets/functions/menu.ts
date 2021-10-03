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
        },
        {
          id: 'd',
          name: 'Buffalo Chicken Wings',
          description: 'Spicy chicken wings',
          currency: 'USD',
          price: 6.99,
          available: true,
        },
        {
          id: 'e',
          name: 'Siu Mei',
          description: 'Chinese Dimsum',
          currency: 'USD',
          price: 3.99,
          available: true,
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
        },
        {
          id: 'c1',
          name: 'Gulab Jamun',
          description: 'Deep-fried sweets from India',
          currency: 'USD',
          price: 4.99,
          available: true,
        },
        {
          id: 'd1',
          name: 'Lamingtons',
          description: 'square sponge cakes from Australia',
          currency: 'USD',
          price: 6.99,
          available: true,
        },
      ],
    },
  ],
}

const handler: Handler = async (event) => {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } else if (event.httpMethod === 'OPTIONS') {
    // To enable CORS
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
    }
    return {
      statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
      headers,
      body: 'This was a preflight call!',
    }
  }

  return {
    statusCode: 500,
    body: `Unsupported http method: ${event.httpMethod}`,
  }
}

export { handler }
