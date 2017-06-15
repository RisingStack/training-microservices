'use strict'

const fs = require('fs')
const express = require('express')
const httpSignature = require('http-signature')

const app = express()
const port = process.env.PORT || 3002
const publicKeys = {
  'my-key': fs.readFileSync('./key.pub')
}

app.use((req, res, next) => {
  let isValidSignature

  // Validate signature
  try {
    const parsed = httpSignature.parseRequest(req)
    isValidSignature = httpSignature.verifySignature(parsed, publicKeys[parsed.keyId])
  } catch (err) {
    isValidSignature = false
  }

  // Unauthorized
  if (!isValidSignature) {
    res.statusCode = 401
    res.json({
      status: 'Unauthorized'
    })
    return
  }

  next()
})

app.get('/', (req, res) => {
  res.json({
    status: 'ok'
  })
})

app.listen(port, () => {
  console.info(`Server 2 is listening on port ${port}!`)
})
