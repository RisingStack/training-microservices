'use strict'

const fs = require('fs')
const express = require('express')
const request = require('request-promise-native')

const app = express()
const port = process.env.PORT || 3001
const privateKeys = {
  'my-key': fs.readFileSync('./key')
}

app.get('/', (req, res, next) => {
  const keyId = 'my-key'

  request({
    method: 'GET',
    uri: 'http://localhost:3002',
    json: true,
    httpSignature: {
      keyId,
      key: privateKeys[keyId]
    }
  })
    .then((body) => res.json(body))
    .catch((err) => next(err))
})

app.listen(port, () => {
  console.info(`Server 1 is listening on port ${port}!`)
})
