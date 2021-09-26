import { Handler } from "@netlify/functions";

const data = {
  "menu": [
    {
      "id": "1",
      "question": "Which appetizer(s) do you wish to order?",
      "choices": [
        {
          "id": "a",
          "name": "Egg salad",
          "description": "Egg salad",
          "currency": "USD",
          "price": 4.99,
          "available": true
        },
        {
          "id": "b",
          "name": "Tomato salad",
          "description": "Tomato salad",
          "currency": "USD",
          "price": 4.99,
          "available": true
        },
        {
          "id": "c",
          "name": "Bread",
          "description": "Bread",
          "currency": "USD",
          "price": 6.99,
          "available": true
        },
        {
          "id": "d",
          "name": "Buffalo Chicken Wings",
          "description": "Spicy chicken wings",
          "currency": "USD",
          "price": 8.99,
          "available": true
        },
        {
          "id": "e",
          "name": "Siu Mei",
          "description": "Chinese Dimsum",
          "currency": "USD",
          "price": 7.99,
          "available": false
        }
      ]
    },
    {
      "id": "2",
      "question": "Which dessert(s) do you wish to order?",
      "choices": [
        {
          "id": "a1",
          "name": "Ice cream",
          "description": "Ice cream",
          "currency": "USD",
          "price": 1.99,
          "available": true
        },
        {
          "id": "b1",
          "name": "Tiramisu",
          "description": "Coffee Flavoured Dessert from Italy",
          "currency": "USD",
          "price": 2.99,
          "available": true
        },
        {
          "id": "c1",
          "name": "Gulab Jamun",
          "description": "Deep-fried sweets from India",
          "currency": "USD",
          "price": 2.99,
          "available": true
        },
        {
          "id": "d1",
          "name": "Lamingtons",
          "description": "square sponge cakes from Australia",
          "currency": "USD",
          "price": 3.99,
          "available": true
        }
      ]
    }
  ]
}

const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export { handler };
