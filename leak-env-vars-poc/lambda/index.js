const { sum } = require('compromised-npm-package')

exports.handler = async () => {
  const secretFromEnv = process.env.MY_SECRET

  // use the secret somehow... we'll just log it
  console.log('secretFromEnv', secretFromEnv)

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
