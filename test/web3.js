'use strict'

const { test } = require('ava')
const context = require('../')
const sinon = require('sinon')
const Web3 = require('web3')

let spy = sinon.spy(Web3)

test("Load context: No opts", (t) => {
  t.plan(1)

  const { web3 } = context()

  t.true(web3 instanceof Web3)
})

test("Load context: No web3 opts", (t) => {
  t.plan(1)

  const { web3 } = context({ notWeb3: {} })

  t.true(web3 instanceof Web3)
})

test("Load context: Invalid opts", (t) => {
  t.plan(1)

  const { web3 } = context({ notWeb3: {} })

  t.true(web3 instanceof Web3)
})

test("Load context: No provider", (t) => {
  t.plan(1)

  const { web3 } = context({ web3: {} })

  t.true(web3 instanceof Web3)
})

test("Load context: Invalid provider", (t) => {
  t.plan(1)

  t.throws(() => {
    context({
      web3: {
        provider: 1
      }
    })
  }, TypeError)
})

test("Load context: Valid provider", (t) => {
  t.plan(2)

  const { web3 } = context({ web3: { provider: 'ws://localhost:8546' } })

  t.true(web3 instanceof Web3)
  t.is(web3.currentProvider.connection._url, 'ws://localhost:8546')
})

