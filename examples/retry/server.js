'use strict'

const express = require('express')

const app = express()
const port = process.env.PORT || 3001
let errorCounter = 0


app.get('/', (req, res) => {
  const idempotencyKey = req.headers['x-idempotency']
  const counter = req.query.counter

  errorCounter += 1

  // Fail for every second and third call
  if (errorCounter % 2 === 0 || errorCounter % 3 === 0) {
    res.statusCode = 500
    res.json({
      status: 'error'
    })
    console.log(`Server. ${counter} response with: error, idempotencyKey: ${idempotencyKey}`)
    return
  }

  console.log(`Server. ${counter} response with: success, idempotencyKey: ${idempotencyKey}`)

  res.json({
    status: 'ok'
  })
})

app.listen(port, () => {
  console.info(`Server is listening on port ${port}!`)
})
