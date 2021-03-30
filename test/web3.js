const test = require('ava')

const { load } = require('../web3')

test.cb('web3.load(opts) is a function', (t) => {
  t.true('function' === typeof load)
  t.end()
})

test.cb('web3.load(opts) throws on bad input', (t) => {
  t.throws(() => load(null), { instanceOf: TypeError })
  t.throws(() => load(true), { instanceOf: TypeError })
  t.throws(() => load(1234), { instanceOf: TypeError })
  t.throws(() => load('string'), { instanceOf: TypeError })
  t.throws(() => load(() => {}), { instanceOf: TypeError })
  t.end()
})

test.cb('web3.load(opts) returns a Web3 instance', (t) => {
  let web3 = null

  web3 = load({ provider: 'wss://localhost:8454' })
  t.true(null !== web3 && 'object' === typeof web3)

  t.end()
})
