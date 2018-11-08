const web3 = require('./web3')
const events = require('events').EventEmitter

module.exports = context

let CtxCache

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
    ctx.web3 = web3.load(opts.web3)
    // CtxCache = ctx

    ctx.web3.currentProvider.connection.once('connect', () => {
      // console.log('emit ready')
      // console.log(ctx.web3.currentProvider.connection)
      ctx.emit('ready')
    })
  } else {
    ctx.web3 = web3.api()
  }

  ctx.close = () => {
    if (ctx.web3) {
      // console.log(ctx.web3.currentProvider.connection)
      ctx.web3.currentProvider.connection.close()
    }
  }

  return ctx
}
