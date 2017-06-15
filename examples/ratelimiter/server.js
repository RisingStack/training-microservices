'use strict'

const express = require('express')
const Limiter = require('ratelimiter')
const redis = require('redis')

const redisClient = redis.createClient()
const app = express()
const port = process.env.PORT || 3001
const ratelimiterMax = Number(process.env.RATE_LIMITER_MAX) || 5                    // 5 requests
const ratelimiterDuration = Number(process.env.RATE_LIMITER_DURATION) || 60 * 1000  // per minute

app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  const limiter = new Limiter({
    db: redisClient,
    id: clientIP,
    max: ratelimiterMax,
    duration: ratelimiterDuration
  })

  limiter.get((err, limit) => {
    if (err) {
      return next(err)
    }

    res.set('RateLimit-Limit', limit.total)
    res.set('RateLimit-Remaining', limit.remaining - 1)
    res.set('RateLimit-Reset', limit.reset)

    if (limit.remaining) {
      return next()
    }

    const after = Math.floor(limit.reset - (Date.now() / 1000))
    res.set('Retry-After', after)
    res.sendStatus(429)

    return next()
  })
})

app.get('/', (req, res, next) => {
  res.send('ok')
})

app.listen(port, () => {
  console.info(`Server listening on port ${port}!`)
})
