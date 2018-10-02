<img src="https://github.com/arablocks/ara-module-template/blob/master/ara.png" width="30" height="30" /> ara-context
===========

[![Build Status](https://travis-ci.com/AraBlocks/ara-context.svg?token=6WjTyCg41y8MBmCzro5x&branch=master)](https://travis-ci.com/AraBlocks/ara-context)

Ara context to encapsulate things like Web3, etc.

## Status

**Stable**

## Installation

```sh
$ npm install ara-context
```

## Usage

```js
const context = require('ara-context')()
```

## API

### `context = require('ara-context')(opts)`

where `opts` can be:

* `opts.web3` - An object of options for configuring `Web3`
* `opts.web3.provider` - A `Web3` provider or URI for a provider (`http`, `ws`, etc)
* `opts.web3.[id].providers` - Array of network providers, where `id` is a string representation of the network/chain id

## Contributing

- [Commit message format](/.github/COMMIT_FORMAT.md)
- [Commit message examples](/.github/COMMIT_FORMAT_EXAMPLES.md)
- [How to contribute](/.github/CONTRIBUTING.md)

Releases follow [Semantic Versioning](https://semver.org/)

## See Also

* [context](https://goo.gl/MdvPRz)

## License

LGPL-3.0
