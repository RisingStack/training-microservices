'use strict'

const request = require('request')
const express = require('express')
const opentracing = require('opentracing')
const jaeger = require('jaeger-client')
const UDPSender = require('jaeger-client/dist/src/reporters/udp_sender').default

const app = express()
const port = process.env.PORT || 3002

// Tracer
const udpSender = new UDPSender()
const reporter = new jaeger.RemoteReporter(udpSender)
const sampler = new jaeger.RateLimitingSampler(1)
const tracer = new jaeger.Tracer('service 2', reporter, sampler)

app.get('/site/:site', (req, res, next) => {
  const spanContext = jaeger.SpanContext.fromString(req.headers['trace-span-context'])
  const span = tracer.startSpan('http_server', {
    childOf: spanContext
  })
  span.setTag(opentracing.Tags.HTTP_URL, `${req.protocol}://${req.hostname}${req.originalUrl}`)
  span.setTag(opentracing.Tags.HTTP_METHOD, req.method)
  span.setTag('request_path', req.route.path)
  span.setTag('request_id', req.headers['x-request-id'])

  res.json({
    name: req.params.site,
    url: `https://${req.params.site}.com`
  })
  span.setTag(opentracing.Tags.HTTP_STATUS_CODE, 200)
  span.finish()
})

app.listen(port, () => {
  console.log(`Server 2 listening on port ${port}!`)
})
