# write-file-promise

Write a file creating intermediate directories

## Installation

`npm install --save write-file-promise`

## Usage

```js
const write = require('write-file-promise');

write('/tmp/create/file.log', data)
.then(() => {})
.catch(() => {})
```

The module creates intermediate directories `tmp` and `create` if they don't exist already.

`write` has the same signature of `fs.writeFile` except the last parameter `callback`.
