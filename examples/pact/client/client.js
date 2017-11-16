'use strict'

const request = require('request-promise-native')
const _ = require('lodash')

const SITES_SERVICE_URL = process.env.SITES_SERVICE_URL || 'http://localhost:1234'

async function getSites () {
  const sites = await request(`${SITES_SERVICE_URL}/sites`)
    .then(JSON.parse)

  const sitesString = _.reduce(sites, (logString, site) => `${logString} ${site.title}`, 'CLIENT: Current sites are:')

  console.log(sitesString)
}

function main () {
  return getSites()
}

module.exports = {
  getSites,
  main
}
