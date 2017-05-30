'use strict'

const url = require('url')
const path = require('path')
const Etcd = require('node-etcd')

const etcd = new Etcd()
const SERVICE_NAME = 'service-2'

function getServiceUrlFromEtcdData (data) {
  let serviceData

  try {
    serviceData = JSON.parse(data.node.value)
  } catch (err) {
    return ''
  }

  return url.format(serviceData)
}

function getServiceUrlByName (serviceName, callback) {
  const serviceKey = path.join('/', 'services', serviceName)

  etcd.get(serviceKey, { wait: true }, (err, data) => {
    if (err) {
      return callback(err)
    }

    const serviceUrl = getServiceUrlFromEtcdData(data)
    return callback(null, serviceUrl)
  })
}

function watchServiceUrlByName (serviceName) {
  const serviceKey = path.join('/', 'services', serviceName)

  etcd.watcher(serviceKey)
    .on('change', (data) => {
      if (data.action === 'set') {
        const serviceUrl = getServiceUrlFromEtcdData(data)
        console.log(`${serviceName} changed, new url: ${serviceUrl}`)
      } else if (data.action === 'expire') {
        console.log(`${serviceName} expired`)
      }
    })
}

console.info(`${SERVICE_NAME} is started`)

getServiceUrlByName('service-1', (err, serviceUrl) => {
  if (err) {
    return console.error('Service discovery error', err)
  }

  console.info(`service-1 is available at: ${serviceUrl}`)
})

watchServiceUrlByName('service-1')
