'use strict'

const pact = require('@pact-foundation/pact-node')
const path = require('path')
require('./testSitesService')

const opts = {
  providerBaseUrl: 'http://localhost:3001',
  providerStatesSetupUrl: 'http://localhost:3001/test/setup',
  pactUrls: [path.resolve(__dirname, '../../pacts/client-siteservice.json')]
}

pact.verifyPacts(opts).then(() => {
  console.log('success')
  process.exit(0)
}).catch((error) => {
  console.log('failed', error)
  process.exit(1)
})
