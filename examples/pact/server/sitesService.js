'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controller')

const app = express()

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('pact example server'))

app.get('/sites', controller.get)
app.post('/sites', controller.create)
app.get('/sites/:id', controller.findById)
app.put('/sites/:id', controller.updateById)
app.delete('/sites/:id', controller.removeById)

module.exports = app
