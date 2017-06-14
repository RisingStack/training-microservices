'use strict'

const _ = require('lodash')
const express = require('express')
const request = require('request-promise-native')
const RSCache = require('@risingstack/cache')
const parseCacheControl = require('wreck').parseCacheControl

const memoryStore = new RSCache.MemoryStore()
const cache = new RSCache([memoryStore], {
  timeout: 200
})
const app = express()
const port = process.env.PORT || 3001

function requestWithCache (url, method = 'GET') {
  function sendRequest (url) {
    return request({
      url,
      method,
      headers: { 'User-Agent': 'Awesome-Octocat-App' },
      resolveWithFullResponse: true,
      json: true
    })
      .then((response) => {
        const body = response.body
        const cacheControlHeader = response.headers['cache-control']

        let cacheOptions = {}

        if (method === 'GET' && cacheControlHeader) {
          const parsedCacheControl = parseCacheControl(cacheControlHeader) || {}
          const maxAge = Number(parsedCacheControl['max-age'])
          const staleIfError = Number(parsedCacheControl['stale-if-error'])

          // overried the default ttl options
          if (_.isNumber(maxAge) || _.isNumber(staleIfError)) {
            const stale = !_.isNaN(maxAge) ? maxAge * 1000 : undefined
            const expire = !_.isNaN(staleIfError) ? staleIfError * 1000 : stale

            // now < stale < expire
            cacheOptions = {
              // until the max age time the value is up to date
              stale,
              // try to refresh the value when it's stale but not yet expired
              // on error we can still use the stored value
              expire
            }
          }
        }

        return {
          cacheOptions,
          value: body
        }
      })
  }

  const cacheKey = url

  return cache.wrap(cacheKey, sendRequest)
}

app.get('/', (req, res, next) => {
  requestWithCache('https://api.github.com/repos/risingstack/trace-nodejs/releases/latest')
    .then((body) => res.json(body))
    .catch((err) => next(err))
})

app.listen(port, () => {
  console.info(`Server is listening on port ${port}!`)
})
