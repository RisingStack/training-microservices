'use strict'

const request = require('request-promise-native')
const promiseRetry = require('promise-retry')
const uuidv1 = require('uuid/v1')

function getWithRetry (uri, logContext) {
  const idempotencyKey = uuidv1()
  let started
  let lastRetry

  return promiseRetry((retry, number) => {
    if (number === 1) {
      started = Date.now()
    }

    console.log(`Client ${logContext.counter}. Making request, after ${Date.now() - started}ms, Runs for ${number}. time.`)

    if (lastRetry) {
      console.log(`Client ${logContext.counter}. Retried after ${Date.now() - lastRetry}ms`)
    }

    return request({
      uri,
      headers: {
        'x-idempotency': idempotencyKey
      }
    })
      .catch((err) => {
        // Only retry for server and network issues
        if (err.statusCode > 499 || err.code === 'ETIMEDOUT') {
          console.log(`Client ${logContext.counter}. Request failed: retry, Runs for ${number}. time`)
          lastRetry = Date.now()
          retry(err)
        }

        throw err
      })
  }, {
    retries: 3,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 5000
  })
}

// Call getWithRetry
let counter = 0

function call () {
  counter += 1
  console.log(`Client ${counter}. Request started`)

  getWithRetry(`http://localhost:3001?counter=${counter}`, { counter })
    .then((body) => console.log(`Client ${counter}. Request finished with: success`, body))
    .catch((err) => console.log(`Client ${counter}. Request finished with: failed`, err.message))
}

// Start
call()
setTimeout(() => call(), 2000)
