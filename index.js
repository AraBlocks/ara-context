const web3 = require('./web3')
const pify = require('pify')
const thunky = require('thunky')

module.exports = context

/**
 * Creates an ARA context that wraps useful
 * instances like `Web3'
 *
 * @public
 * @default
 * @param {Object} opts
 * @return {Object}
 */
function context(opts) {
  if (null === opts || (undefined !== opts && 'object' !== typeof opts)) {
    throw new TypeError('Expecting options to be an object.')
  } else if ('object' !== typeof opts) {
    // eslint-disable-next-line no-param-reassign
    opts = {}
  }

  if (false === opts.provider) {
    if (opts.web3) {
      opts.web3.provider = false
    } else {
      opts.web3 = {
        provider: false
      }
    }
  }

  const ctx = {
    web3: web3.load(opts.web3)
  }

  ctx.close = () => {
    if (ctx.web3 && ctx.web3.currentProvider && ctx.web3.currentProvider.connection) {
      ctx.web3.currentProvider.connection.close()
    }
  }

  ctx.ready = pify(thunky((done) => {
    let connected = false
    setTimeout(() => {
      if (!connected) {
        ctx.close()
        done(new Error('Could not connect to a provider.'))
      }
    }, 3000)
    if (ctx.web3 && ctx.web3.currentProvider) {
      ctx.web3.currentProvider.once('connect', () => {
        connected = true
        done()
      })
    }
  }))

  return ctx
}
