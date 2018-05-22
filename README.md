ara-context
===========

ARA context to encapsulate things like Web3, etc

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

## License

LGPL-3.0
