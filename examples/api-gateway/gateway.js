'use strict'

const express = require('express')
const httpProxy = require('express-http-proxy')
const request = require('request-promise-native')
const xml = require('xml')

const app = express()
const port = process.env.PORT || 3001

const service1Url = 'http://localhost:3002'
const service2Url = 'http://localhost:3003'

const service1Proxy = httpProxy(service1Url)
const service2Proxy = httpProxy(service2Url)

app.use((req, res, next) => {
  // TODO: my authentication logic
  console.log(`Authentication: ${req.path}`)
  next()
})

// Merge services
app.get('/', async (req, res) => {
  const services = await Promise.all([
    request({ uri: service1Url, json: true }),
    request({ uri: service2Url, json: true })
  ])

  const serviceNames = services.map((service) => service.name)
  const response = { serviceNames }

  if (req.get('Content-Type') === 'application/xml') {
    const xmlResponse = xml(response)
    res.set('content-type', 'text/xml')
    res.end(xmlResponse)
  } else {
    res.json(response)
  }
})

// Proxy request
app.get('/service1', (req, res, next) => {
  service1Proxy(req, res, next)
})

app.get('/service2', (req, res, next) => {
  service2Proxy(req, res, next)
})

app.listen(port, () => {
  console.info(`API Gateway is listening on port ${port}!`)
})
