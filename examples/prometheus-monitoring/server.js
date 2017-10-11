'use strict'

const express = require('express')
const Prometheus = require('prom-client')
const _ = require('lodash')

const app = express()
const port = process.env.PORT || 3001
const metricsInterval = Prometheus.collectDefaultMetrics()
const httpRequestsTotal = new Prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['route', 'code']
})
const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['route']
})

app.use((req, res, next) => {
  res.locals.startEpoch = Date.now()
  next()
})

app.get('/', (req, res, next) => {
  setTimeout(() => {
    res.json({ message: 'Hello World!' })
    next()
  }, Math.round(Math.random() * 200))
})

app.get('/metrics', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType)
  res.end(Prometheus.register.metrics())
})

app.use((req, res, next) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch
  const path = _.get(req, 'route.path') || req.path

  httpRequestsTotal.inc({ route: path, code: res.statusCode })
  httpRequestDurationMicroseconds.labels(path).observe(responseTimeInMs)

  next()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

process.on('SIGTERM', () => {
  clearInterval(metricsInterval)
  process.exit(0)
})
