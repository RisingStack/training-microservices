'use strict'

const express = require('express')
const CircuitBreaker = require('circuit-breaker-js')

const app = express()
const port = process.env.PORT || 3001
const breaker = new CircuitBreaker()

function valueableResource (isFail) {
  return isFail ? Promise.reject(new Error('Resource error')) : Promise.resolve('Foo')
}

function protectedValueableResource (isFail) {
  return new Promise((resolve, reject) => {
    breaker.run((success, failed) => {
      valueableResource(isFail)
        .then((result) => {
          success()
          resolve(result)
        })
        .catch((err) => {
          failed(err)
          reject(err)
        })
    }, () => {
      reject(new Error('Circuit breaker is active'))
    })
  })
}

app.get('/', (req, res, next) => {
  const isFail = !!req.query.fail

  protectedValueableResource(isFail)
    .then((result) => {
      res.send({ result })
      next()
    })
    .catch((err) => {
      res.send({ err: err.message })
    })
})

app.listen(port, () => {
  console.info(`Server listening on port ${port}!`)
})
