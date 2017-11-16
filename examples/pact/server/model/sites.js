'use strict'

const _ = require('lodash')

const data = process.env.NODE_ENV === 'test'
  ? []
  : [{ id: 1, title: 'RisingStack', url: 'https://risingstack.com' }]

function getAll () {
  return data
}

function create (site) {
  data.push(site)
  return site
}

function getById (id) {
  return _.find(data, { id })
}

function updateById (id, site) {
  const siteIndex = _.findIndex(data, { id })
  data[siteIndex] = site
  return site
}

function removeById (id) {
  const siteIndex = _.findIndex(data, { id })
  data.splice(siteIndex, 1)
}

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  removeById
}

