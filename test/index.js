const context = require('../')
const test = require('ava')

test.cb('context(opts) is a function', (t) => {
  t.true('function' === typeof context)
  t.end()
})

test.cb('context(opts) throws on bad input', (t) => {
  t.throws(() => context(null), {instanceOf: TypeError})
  t.throws(() => context(true), {instanceOf: TypeError})
  t.throws(() => context(1234), {instanceOf: TypeError})
  t.throws(() => context('string'), {instanceOf: TypeError})
  t.throws(() => context(() => {}), {instanceOf: TypeError})
  t.end()
})

test.cb('context(opts) returns an object', (t) => {
  const ctx = context({ web3: { provider: 'ws://localhost:8454' } })
  t.true(null !== ctx)
  t.true('object' === typeof ctx)
  t.end()
})
