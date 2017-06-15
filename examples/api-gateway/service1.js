'use strict'

const express = require('express')

const app = express()
const port = process.env.PORT || 3002

app.get('*', (req, res) => {
  res.json({
    name: 'service 1'
  })
})

app.listen(port, () => {
  console.info(`Service 1 is listening on port ${port}!`)
})
