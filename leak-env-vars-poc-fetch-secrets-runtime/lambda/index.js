const { sum } = require('compromised-npm-package')
const AWS = require('aws-sdk')

exports.handler = async () => {
  const secretFromSsm = await fetchSecret(process.env.MY_SECRET_NAME)

  // use the secret somehow... we'll just log it
  console.log('secretFromSsm', secretFromSsm)

  const a = randomInteger(1, 100)
  const b = randomInteger(1, 100)
  const result = await sum(a, b)

  const response = {
    a,
    b,
    result,
  }

  return response
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function fetchSecret(name) {
  const ssm = new AWS.SSM({ region: 'us-east-1' })

  const options = {
    Name: name,
    WithDecryption: true,
  }

  const data = await ssm.getParameter(options).promise()

  return data
}
