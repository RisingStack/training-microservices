'use strict'

const express = require('express')
const request = require('request-promise-native')
const opentracing = require('opentracing')
const jaeger = require('jaeger-client')
const UDPSender = require('jaeger-client/dist/src/reporters/udp_sender').default

const app = express()
const port = process.env.PORT || 3001

// Tracer
const udpSender = new UDPSender()
const reporter = new jaeger.RemoteReporter(udpSender)
const sampler = new jaeger.RateLimitingSampler(1)
const tracer = new jaeger.Tracer('service 1', reporter, sampler)

app.get('/site', (req, res, next) => {
  const span = tracer.startSpan('http_server')

  span.setTag(opentracing.Tags.HTTP_URL, `${req.protocol}://${req.hostname}${req.originalUrl}`)
  span.setTag(opentracing.Tags.HTTP_METHOD, req.method)
  span.setTag('request_path', req.route.path)

  const requestOptions = {
    headers: { 'trace-span-context': span.context().toString() },
    json: true
  }

  Promise.all([
    request(Object.assign({ uri: 'http://localhost:3002/site/twitter' }, requestOptions)),
    request(Object.assign({ uri: 'http://localhost:3002/site/risingstack' }, requestOptions))
  ])
    .then((sites) => {
      span.setTag(opentracing.Tags.HTTP_STATUS_CODE, 200)
      res.json({ sites })
    })
    .catch((err) => {
      span.setTag(opentracing.Tags.HTTP_STATUS_CODE, 500)
      span.setTag(opentracing.Tags.ERROR, true)

      res.statusCode = 500
      res.json({ status: 'upstream error' })
    })
    .then(() => span.finish())
})

app.listen(port, () => {
  console.log(`Server 1 listening on port ${port}!`)
})
