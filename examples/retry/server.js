'use strict'

/* eslint-disable consistent-return */

const express = require('express')

const app = express()
const port = process.env.PORT || 3001
let errorCounter = 0
const idempotencyStore = new Map()

app.get('/', (req, res) => {
  const idempotencyKey = req.headers['x-idempotency']
  const counter = req.query.counter

  if (idempotencyStore.get(idempotencyKey)) {
    console.log(`Server ${counter}. request already served, respond with: success, idempotencyKey: ${idempotencyKey}`)
    return res.json({
      status: 'ok'
    })
  }

  errorCounter += 1

  // Fail for every second call
  if (errorCounter % 2 === 0) {
    res.statusCode = 500
    res.json({
      status: 'error'
    })
    console.log(`Server ${counter}. respond with: error, idempotencyKey: ${idempotencyKey}`)
    return
  }

  console.log(`Server ${counter}. respond with: success, idempotencyKey: ${idempotencyKey}`)

  idempotencyStore.set(idempotencyKey, true)
  res.json({
    status: 'ok'
  })
})

app.listen(port, () => {
  console.info(`Server is listening on port ${port}!`)
})
