'use strict'

const sites = require('./model/sites')

function get (req, res) {
  res.json(sites.getAll())
}

function create (req, res) {
  const site = req.params.site
  sites.create(site)

  res.statusCode = 201
  res.json(site)
}

function findById (req, res) {
  const siteId = req.params.id

  res.json(sites.getById(siteId))
}

function updateById (req, res) {
  const siteId = req.params.id
  const site = req.params.site

  sites.updateById(siteId, site)

  res.json(site)
}

function removeById (req, res) {
  const siteId = req.params.id

  sites.removeById(siteId)

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
