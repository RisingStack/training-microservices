'use strict'

const _ = require('lodash')

const sites = [
  { id: 1, title: 'RisingStack', url: 'https://risingstack.com' }
]

function get (req, res) {
  res.json(sites)
}

function create (req, res) {
  const site = req.swagger.params.site.value
  sites.push(site)

  res.statusCode = 201
  res.json(site)
}

function findById (req, res) {
  const siteId = req.swagger.params.id.value
  const site = _.find(sites, { id: siteId })

  res.json(site)
}

function updateById (req, res) {
  const siteId = req.swagger.params.id.value
  const site = req.swagger.params.site.value

  const siteIndex = _.findIndex(sites, { id: siteId })
  sites[siteIndex] = site

  res.json(site)
}

function removeById (req, res) {
  const siteId = req.swagger.params.id.value

  const siteIndex = _.findIndex(sites, { id: siteId })
  sites.splice(siteIndex, 1)

  res.statusCode = 204
  res.end()
}

module.exports = {
  get,
  create,
  findById,
  updateById,
  removeById
}
