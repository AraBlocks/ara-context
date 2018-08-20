const { load } = require('../web3')
const test = require('ava')

test.cb('web3.load(opts) is a function', (t) => {
  t.true('function' === typeof load)
  t.end()
})

test.cb('web3.load(opts) throws on bad input', (t) => {
  t.throws(() => load(null), TypeError)
  t.throws(() => load(true), TypeError)
  t.throws(() => load(1234), TypeError)
  t.throws(() => load('string'), TypeError)
  t.throws(() => load(() => {}), TypeError)
  t.end()
})

test.cb('web3.load(opts) returns a Web3 instance', (t) => {
  const opts = {}
  let web3 = null

  web3 = load()
  t.true(null !== web3 && 'object' === typeof web3)

  web3 = load({ provider: null })
  t.true(null !== web3 && 'object' === typeof web3)

  web3 = load({ provider: undefined })
  t.true(null !== web3 && 'object' === typeof web3)

  web3 = load({ provider: 'ws://localhost:1234' })
  t.true(null !== web3 && 'object' === typeof web3)

  web3 = load(opts)
  t.true(null !== web3 && 'object' === typeof web3)

  t.end()
})
