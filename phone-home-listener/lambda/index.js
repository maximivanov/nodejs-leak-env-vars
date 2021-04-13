exports.handler = async (event) => {
  let body = {}

  if (event && event.body) {
    body = JSON.parse(event.body)
  }

  console.log('Got call home!', body)

  const response = {
    statusCode: 200,
    body: 'OK',
  }

  return response
}
