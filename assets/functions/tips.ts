import { Handler } from '@netlify/functions'

export const handler: Handler = (event) => {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        tips: [0, 5, 7.5, 10, 12.5, 15, 20],
      }),
    }
  }

  return {
    statusCode: 500,
    body: `Unsupported http method: ${event.httpMethod}`,
  }
}
