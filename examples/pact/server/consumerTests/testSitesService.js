'use strict'

const app = require('../sitesService')
const sites = require('../model/sites')

const port = process.env.PORT || 3001

app.post('/test/setup', (req, res) => {
  const state = req.body.state
  switch (state) {
    case 'it has one site':
      sites.create({ id: 1, title: 'Foo', url: 'http://foo.com' })
      break
    default:
      break
  }
  res.end()
})


app.listen(port, (err) => {
  if (err) {
    throw err
  }
  console.log('SERVER: SiteService listening at', port)
})
