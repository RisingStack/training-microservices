'use strict'

const SwaggerClient = require('swagger-client-sync')

const client = SwaggerClient('http://localhost:3001/api-docs')

Promise.resolve()
  // Get
  .then(() => client.apis.site.get())
  .then((response) => console.log('Get', response.data))
  // Insert
  .then(() => client.apis.site.create({
    site: {
      id: 2,
      title: 'Twitter',
      url: 'https://twitter.com'
    }
  }))
  .then((response) => console.log('Insert', response.data))
  // Get
  .then(() => client.apis.site.get())
  .then((response) => console.log('Get', response.data))
  .catch((err) => console.error(err))
