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
    // eslint-disable no-param-reassign
    opts = {}
  }

  opts = { ...opts }

  if (!opts.provider) {
    if (false === opts.provider) {
      return new Web3(provider())
    }

    if (rc.web3 && rc.web3.provider) {
      opts.provider = rc.web3.provider
    }

    if (rc.web3 && rc.web3.network_id) {
      opts.provider = getProvider(rc.web3)
    }
  }

  if (opts.provider && opts.provider.targets) {
    const { targets, ..._opts } = opts.provider
    opts = _opts
    opts.provider = targets
  }

  const providers = Array.isArray(opts.provider) && 1 === opts.provider.length
    ? opts.provider[0]
    : opts.provider

  delete opts.provider
  return new Web3(provider(providers, opts))
}

/**
 * Returns the provider(s) based on .ararc network id.
 * @param  {Object} web3
 * @return {String|Array}
 */
function getProvider(web3) {
  const { network_id: networkId } = web3

  if (networkId && web3[networkId]) {
    const ctx = web3[networkId]
    return ctx.providers || ctx.provider
  }

  return web3.provider
}

module.exports = {
  load
}
