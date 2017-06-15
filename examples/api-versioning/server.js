'use strict'

const express = require('express')
const routesVersioning = require('express-routes-versioning')()

const app = express()
const port = process.env.PORT || 3001

// Approach 1: Versioning in path
app.get('/api/v1/site', handlerV1)
app.get('/api/v2/site', handlerV2)

// Approach 2: Versioning via headers
app.get('/site', routesVersioning({
  '~1.0.0': handlerV1,   // anything like: 1.0.0, 1.1.0, 1.1.1 etc.
  '~2.0.0': handlerV2    // anything like: 2.0.0, 2.2.0, 2.2.1 etc.
}))

function handlerV1 (req, res) {
  res.json({ version: 1 })
}

function handlerV2 (req, res) {
  res.json({ version: 2 })
}

app.listen(port, () => {
  console.info(`Server is listening on port ${port}!`)
})
