'use strict'

const app = require('./sitesService')
const port = process.env.PORT || 3001


app.listen(port, (err) => {
  if (err) {
    throw err
  }
  console.log('SERVER: SiteService listening at', port)
})
