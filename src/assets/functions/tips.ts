import { Handler } from '@netlify/functions'

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        tips: [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20],
      }),
    }
  }

  return {
    statusCode: 500,
    body: `Unsupported http method: ${event.httpMethod}`,
  }
}
