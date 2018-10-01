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
  if (null === opts || (undefined !== opts && 'object' !== typeof opts)) {
    throw new TypeError('Expecting options to be an object.')
  } else if ('object' !== typeof opts) {
    // eslint-disable-next-line no-param-reassign
    opts = {}
  }

  if (!opts.provider && rc.geth) {
    // eslint-disable-next-line no-param-reassign
    opts.provider = Object.values(rc.geth).find(k => k.provider) || {}
  }

  if (!opts.provider) {
    throw new TypeError('Unable to resolve a Web3 provider.')
  }

  return new Web3(provider(opts.provider))
}

module.exports = {
  load
}
