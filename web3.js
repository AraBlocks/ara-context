'use strict'

const Web3 = require('web3')
const rc = require('ara-runtime-configuration')()

/**
 * Creates a `Web3' context for a given optional
 * provider. This function will attempt to resolve
 * a provider from the ara-runtime-configuration'
 * `ararc' file if one is not given.
 * @public
 * @param {?(Object)} opts
 * @param {?(String|Object)} opts.provider
 * @return {Web3}
 * @throws TypeError
 */
function load(opts) {
  if (null == opts || 'object' != typeof opts) {
    opts = {}
  }

  if (null == opts.provider) {
    if (rc.web3 && rc.web3.provider) {
      opts.provider = rc.web3.provider
    }
  }

  if ('string' != typeof opts.provider && 'object' != typeof opts.provider) {
    throw new TypeError(
      "ara-contex.web3: Expecting provider to be a string or object.")
  }

  return new Web3(opts.provider)
}

module.exports = {
  load
}
