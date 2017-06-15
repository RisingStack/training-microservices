'use strict'

const path = require('path')
const url = require('url')
const SwaggerExpress = require('swagger-express-mw')
const express = require('express')

const app = express()
const port = process.env.PORT || 3001
const swaggerUiPath = path.dirname(require.resolve('swagger-ui-dist'))
const swaggerConfig = {
  appRoot: __dirname // required config
}

SwaggerExpress.create(swaggerConfig, (err, swaggerExpress) => {
  if (err) {
    throw err
  }

  // install middleware
  swaggerExpress.register(app)

  app.listen(port)
})

app.get('/api-docs', (req, res) => {
  res.set('Content-Type', 'text/yaml')
  res.sendFile(path.join(__dirname, 'api/swagger/swagger.yaml'))
})

app.get('/docs', (req, res, next) => {
  if (!req.query.url) {
    const query = req.query
    query.url = '/api-docs'
    res.redirect(301, url.format({ query }))
    return
  }
  next()
})

app.use('/docs', express.static(swaggerUiPath))
