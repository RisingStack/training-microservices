'use strict'

const path = require('path')
const Pact = require('pact')
const interactions = require('./interactions')

const provider = Pact({
  consumer: 'client',
  provider: 'siteService',
  port: 1234,
  log: path.resolve(__dirname, '../../logs', 'mockserver-integration.log'),
  dir: path.resolve(__dirname, '../../pacts'),
  spec: 2
})

module.exports = provider

module.exports.start = () => {
  return provider.setup().then(() => {
    provider.addInteraction(interactions.getSiteList)
  })
}

