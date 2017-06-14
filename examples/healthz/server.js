'use strict'

const express = require('express')
const Redis = require('ioredis')

const redis = new Redis()
const app = express()
const port = process.env.PORT || 3001
const HEALTH_TIMEOUT = 1000

app.get('/healthz', (req, res, next) => {
  Promise.all([
    promiseTimeout(redis.get('dummy_key'), HEALTH_TIMEOUT)
  ])
    .then(() => res.json({ status: 'ok' }))
    .catch((err) => {
      console.error('Healthcheck error', err)
      res.statusCode = 500
      res.json({ status: 'error' })
    })
})

app.listen(port, () => {
  console.info(`Server is listening on port ${port}!`)
})

function promiseTimeout (originalPromise, timeout) {
  return Promise.race([
    // MDN: Generally, if you want to know if a value is a promise or not
    // Promise.resolve(value) it instead and work with the return value as a promise.
    Promise.resolve(originalPromise),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Timed out'))
      }, timeout)
    })
  ])
}
