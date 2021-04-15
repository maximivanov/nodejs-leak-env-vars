const { sum } = require('compromised-npm-package')
const https = require('https')

exports.handler = async () => {
  const secretFromEnv = process.env.MY_SECRET

  // use the secret somehow... we'll just log it
  console.log('secretFromEnv', secretFromEnv)

  const randomFactRaw = await fetch('https://api.chucknorris.io/jokes/random')
  const randomFact = JSON.parse(randomFactRaw).value
  console.log('randomFact', randomFact)

  const a = randomInteger(1, 100)
  const b = randomInteger(1, 100)
  const result = await sum(a, b)

  const response = {
    a,
    b,
    result,
    randomFact,
  }

  return response
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function fetch(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { timeout: 2000 }, (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(new Error(`HTTP status code ${res.statusCode}`))
      }

      const body = []
      res.on('data', (chunk) => body.push(chunk))
      res.on('end', () => {
        const resString = Buffer.concat(body).toString()
        resolve(resString)
      })
    })

    request.on('error', (err) => {
      reject(err)
    })
    request.on('timeout', () => {
      request.destroy()
      reject(new Error('timed out'))
    })
  })
}
