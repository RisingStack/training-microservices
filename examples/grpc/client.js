'use strict'

const grpc = require('grpc')
const promisify = require('es6-promisify')

const sitesProto = grpc.load('sites.proto')
const port = process.env.PORT || 50051
const client = new sitesProto.sites.SiteService(`127.0.0.1:${port}`, grpc.credentials.createInsecure())
const EMPTY_MESSAGE = {}

const insert = promisify(client.insert, client)
const list = promisify(client.list, client)

// Demonstrate
Promise.resolve()
  .then(() => list(EMPTY_MESSAGE))
  .then((response) => console.log('Client: List response', response))
  .then(() => insert({ title: 'Twitter', url: 'https://twitter.com' }))
  .then((response) => console.log('Client: Insert response', response))
  .then(() => list(EMPTY_MESSAGE))
  .then((sites) => console.log('Client: List response', sites))
  .catch((err) => console.error('Client error', err))
