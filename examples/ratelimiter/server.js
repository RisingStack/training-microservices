'use strict'

const express = require('express')
const Limiter = require('ratelimiter')
const redis = require('redis')

const redisClient = redis.createClient()
const app = express()
const port = process.env.PORT || 3001
const ratelimiterMax = Number(process.env.RATE_LIMITER_MAX) || 5                    // 5 requests
const ratelimiterDuration = Number(process.env.RATE_LIMITER_DURATION) || 60 * 1000  // per minute
const disableRatelimiter = process.env.RATE_LIMITER_DISABLE

app.use((req, res, next) => {
  if (disableRatelimiter) {
    return next()
  }

  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  const limiter = new Limiter({
    db: redisClient,
    id: clientIP,
    max: ratelimiterMax,
    duration: ratelimiterDuration
  })

  limiter.get((err, limit) => {
    if (err) {
      console.error(err)
      return next()
    }

    res.set('RateLimit-Limit', limit.total)
    res.set('RateLimit-Remaining', limit.remaining - 1)
    res.set('RateLimit-Reset', limit.reset)

    // Success branch
    if (limit.remaining) {
      return next()
    }

    // Reached the limit
    const after = Math.floor(limit.reset - (Date.now() / 1000))
    res.set('Retry-After', after)
    res.sendStatus(429)
    return res.end()
  })
})

app.get('/', (req, res) => {
  res.send('ok')
})

app.listen(port, () => {
  console.info(`Server listening on port ${port}!`)
})
