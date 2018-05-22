'use strict'

const web3 = require('./web3')

module.exports = context

/**
 * Creates an ARA context that wraps useful
 * instances like `Web3'
 * @public
 * @default
 * @param {Object} opts
 * @return {Object}
 */
function context(opts) {
  if (null == opts) { opts = {} }
  const ctx = {
    web3: web3.load(opts.web3)
  }
  return ctx
}
