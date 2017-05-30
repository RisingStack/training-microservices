'use strict'

const path = require('path')
const express = require('express')
const Etcd = require('node-etcd')

const etcd = new Etcd()
const app = express()

const SERVICE_NAME = 'service-1'
const SERVICE_KEY = path.join('/', 'services', SERVICE_NAME)
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.json({
    hello: `My name is ${SERVICE_NAME}`
  })
})

app.listen(PORT, () => {
  const service = {
    protocol: 'http',
    hostname: '127.0.0.1',
    port: PORT
  }

  // ttl in seconds
  etcd.set(SERVICE_KEY, JSON.stringify(service), { ttl: 1 }, (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
      return
    }

    console.info(`${SERVICE_NAME} is registered`)
  })

  console.info(`${SERVICE_NAME} is listening on port ${PORT}`)
})
