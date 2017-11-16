'use strict'

const ONE_SITE_BODY = [{ title: 'Foo' }] // reuse response mocks as much as possible!

module.exports = {
  getSiteList: {
    state: 'it has one site',
    uponReceiving: 'a request to retrieve site list',
    withRequest: {
      method: 'GET',
      path: '/sites'
    },
    willRespondWith: {
      status: 200,
      body: ONE_SITE_BODY
    }
  }
}
