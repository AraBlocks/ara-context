const web3 = require('./web3')
const events = require('events').EventEmitter

module.exports = context

let Web3Cache

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

  const { loadProvider = true } = opts

  let ctx = new events.EventEmitter()
  if (loadProvider) {
    ctx.web3 = Web3Cache || web3.load(opts.web3)
    Web3Cache = ctx.web3

    Web3Cache.currentProvider.connection.once('connect', () => {
      ctx.emit('ready')
    })
  } else {
    ctx.api = web3.api()
  }

  ctx.close = () => {
    if (Web3Cache) {
      console.log('close!')
      Web3Cache.currentProvider.connection.close()
    }
  }

  console.log('return ctx')
  return ctx
}
