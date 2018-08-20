const provider = require('eth-provider')
const Web3 = require('web3')
const rc = require('ara-runtime-configuration')()

/**
 * Creates a `Web3' context for a given optional
 * provider. This function will attempt to resolve
 * a provider from the ara-runtime-configuration'
 * `ararc' file if one is not given.
 *
 * @public
 * @param {?(Object)} opts
 * @param {?(String|Object)} opts.provider
 * @return {Web3}
 * @throws TypeError
 */
function load(opts) {
  if (null === opts || (opts && 'object' !== typeof opts)) {
    throw new TypeError('Expecting options to be an object.')
  } else if ('object' !== typeof opts) {
    // eslint-disable-next-line no-param-reassign
    opts = {}
  }

  if (!opts.provider) {
    if (rc.web3 && rc.web3.provider) {
      // eslint-disable-next-line no-param-reassign
      opts.provider = rc.web3.provider
    }
  }

  return new Web3(provider(opts.provider))
}

module.exports = {
  load
}
