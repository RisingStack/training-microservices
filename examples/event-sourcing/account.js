'use strict'

const AccountEvent = require('./accountEvent')

// Current state (starts with empty, it's usually stored in a DB)
const accounts = {}

function getAll () {
  return accounts
}

function open (accountId, openingBalance) {
  accounts[accountId] = openingBalance

  AccountEvent.append({
    type: AccountEvent.EVENT.open,
    id: accountId,
    balance: openingBalance,
    timestamp: Date.now()
  })
}

function close (accountId) {
  const balance = accounts[accountId]
  delete accounts[accountId]

  AccountEvent.append({
    type: AccountEvent.EVENT.close,
    id: accountId,
    balance,
    timestamp: Date.now()
  })
}

function transferMoney (accountIdFrom, accountIdTo, amount) {
  accounts[accountIdFrom] -= amount
  accounts[accountIdTo] += amount

  AccountEvent.append({
    type: AccountEvent.EVENT.transfer,
    fromId: accountIdFrom,
    toId: accountIdTo,
    amount,
    timestamp: Date.now()
  })
}

module.exports = {
  get: getAll,
  open,
  close,
  transferMoney
}
