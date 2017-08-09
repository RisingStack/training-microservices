'use strict'

// Imagine that it's a separate microservice :)

const Tortoise = require('tortoise')
const _ = require('lodash')

const tortoise = new Tortoise(process.env.RABBITMQ_URI || 'amqp://localhost')
const QUEUE_USER_CREATE = 'user-created'
const QUEUE_USER_EDIT = 'user-edited'
const QUEUE_ACCOUNT_CREATE = 'account-created'
const QUEUE_ACCOUNT_EDIT = 'account-edited'

// My Denormalized DB
const denormalizedDB = {}

// Create user
tortoise
  .queue(QUEUE_USER_CREATE)
  .prefetch(1)
  .json()
  .subscribe((user, ack) => {
    // Store only name, denormalizer is not interested in other values
    if (user.name) {
      denormalizedDB[user.id] = _.merge(denormalizedDB[user.id], { name: user.name })
    }
    ack()
  })

// Edit user
tortoise
  .queue(QUEUE_USER_EDIT)
  .prefetch(1)
  .json()
  .subscribe((user, ack) => {
    // Store only name, denormalizer is not interested in other values
    if (user.name) {
      denormalizedDB[user.id] = _.merge(denormalizedDB[user.id], { name: user.name })
    }
    ack()
  })

tortoise
  .queue(QUEUE_ACCOUNT_CREATE)
  .prefetch(1)
  .json()
  .subscribe((account, ack) => {
    if (account.balance) {
      denormalizedDB[account.id] = _.merge(denormalizedDB[account.id], { balance: account.balance })
      ack()
    }
  })

tortoise
  .queue(QUEUE_ACCOUNT_EDIT)
  .prefetch(1)
  .json()
  .subscribe((account, ack) => {
    if (account.balance) {
      denormalizedDB[account.id] = _.merge(denormalizedDB[account.id], { balance: account.balance })
      ack()
    }
  })


function getUserById (userId) {
  return denormalizedDB[userId]
}

module.exports = {
  getUserById
}
