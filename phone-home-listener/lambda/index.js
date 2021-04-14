exports.handler = async (event) => {
  console.log('Got call home!', {
    pathParameters: event.pathParameters,
    queryStringParameters: event.queryStringParameters,
    body: event.body,
  })

  const response = {
    statusCode: 200,
    body: 'OK',
  }

  return response
}
