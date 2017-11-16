'use strict'

/* eslint-disable prefer-arrow-callback */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const provider = require('./mockServer/provider')
const client = require('./client')

const expect = chai.expect
chai.use(sinonChai)

describe('site listing', () => {
  const sandbox = sinon.createSandbox()

  before(async function () {
    await provider.start()
  })

  afterEach(() => {
    sandbox.restore()
  })

  after(() => {
    provider.finalize()
  })

  it('should get site list from server', async function () {
    const consoleSpy = sandbox.spy(console, 'log')
    await client.getSites()
    expect(consoleSpy).to.have.been.calledWith('CLIENT: Current sites are: Foo')
    provider.verify()
  })
})
