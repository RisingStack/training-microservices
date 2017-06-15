'use strict'

const grpc = require('grpc')

const sitesProto = grpc.load('sites.proto')
const server = new grpc.Server()
const port = process.env.PORT || 50051

// In-memory sites, you want to use a DB
const sites = [
  { id: 1, title: 'RisingStack', url: 'https://risingstack.com' }
]

server.addService(sitesProto.sites.SiteService.service, {
  list: (call, callback) => {
    callback(null, sites)
  },
  insert: (call, callback) => {
    const site = call.request
    site.id = Math.round(Math.random() * 100)
    sites.push(site)
    callback(null, site)
  }
})

server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure())
server.start()

console.log(`Server running at http://0.0.0.0:${port}`)
