'use strict'

const express = require('express')
const request = require('request-promise-native')
const uuidV1 = require('uuid/v1')
const winston = require('winston')
const gke = require('winston-gke')  // google cloud fluentd logging format

const app = express()
const port = process.env.PORT || 3001
const logLevel = process.env.LOG_LEVEL || 'info'
const logger = gke(new winston.Logger(), logLevel)

function getLogMetaFromReq (req, res) {
  return {
    requestId: res.locals.requestId,
    method: req.method,
    url: req.originalUrl
  }
}

app.use((req, res, next) => {
  res.locals.requestId = req.headers['x-request-id'] || uuidV1()
  res.locals.startEpoch = Date.now()

  logger.debug('HTTP Request received', getLogMetaFromReq(req, res))

  next()
})

app.get('/', (req, res, next) => {
  const requestOpts = {
    // github api requires the User-Agent to be set
    headers: { 'User-Agent': 'Awesome-Octocat-App' },
    json: true
  }

  const orgs = ['nodejs', 'risingstack']

  logger.debug('Get data for organizations', Object.assign(getLogMetaFromReq(req, res), { orgs }))

  Promise.all(
    orgs.map((org) =>
      request(Object.assign({ uri: `https://api.github.com/users/${org}/repos` }, requestOpts))
    )
  )
    .then((organizationRepos) => {
      const orgRepos = organizationRepos.map((repos, i) => ({
        org: orgs[i],
        repos: repos.map((repo) => repo.name)
      }))

      logger.debug('Organization repositories', Object.assign(getLogMetaFromReq(req, res), { orgRepos }))
      res.json(orgRepos)
      next()
    })
    .catch((err) => {
      logger.debug('Repositories error', Object.assign(getLogMetaFromReq(req, res), {
        message: err.message
      }))
      next(err)
    })
})

// error handler
app.use((err, req, res, next) => {
  logger.error('HTTP Request error', Object.assign(getLogMetaFromReq(req, res), {
    message: err.message,
    err
  }))

  next(err)
})

app.use((req, res, next) => {
  logger.debug('HTTP Request responded', Object.assign(getLogMetaFromReq(req, res), {
    statusCode: res.statusCode,
    responseTime: Date.now() - res.locals.startEpoch
  }))

  next()
})

app.listen(port, () => {
  logger.info(`Server listening on port ${port}!`)
})
