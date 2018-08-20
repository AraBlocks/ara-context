const context = require('../')
const test = require('ava')

test.cb('context(opts) is a function', (t) => {
  t.true('function' === typeof context)
  t.end()
})

test.cb('context(opts) throws on bad input', (t) => {
  t.throws(() => context(null), TypeError)
  t.throws(() => context(true), TypeError)
  t.throws(() => context(1234), TypeError)
  t.throws(() => context('string'), TypeError)
  t.throws(() => context(() => {}), TypeError)
  t.end()
})

test.cb('context(opts) returns an object', (t) => {
  const ctx = context()
  t.true(null !== ctx)
  t.true('object' === typeof ctx)
  t.end()
})

test.cb('context(opts) returns a context object', (t) => {
  const ctx = context()
  t.true(null !== ctx.web3)
  t.true('object' === typeof ctx.web3)
  t.end()
})
