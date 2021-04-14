exports.handler = async (event) => {
  console.log('Got call home! Event: ', event)

  const response = {
    status: 'OK',
  }

  return response
}
