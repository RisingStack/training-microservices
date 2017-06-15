'use strict'

const express = require('express')

const app = express()
const port = process.env.PORT || 3003

app.get('*', (req, res) => {
  res.json({
    name: 'service 2'
  })
})

app.listen(port, () => {
  console.info(`Service 2 is listening on port ${port}!`)
})
