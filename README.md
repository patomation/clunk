# Clunk

Command Line Argument Parser helper library.
Written in Typescript.
SMALL. Currently only 4kb

![flavorite](https://raw.githubusercontent.com/patomation/vanilla-starter/master/public/favicon.ico)

## Install

```
npm install clunk
```

## USAGE Example

```JS
import {clunk} from "clunk"
const args = clunk()
console.log(`Cool ${args.cool}!`)
```
Then you could do
```
$ node index.js --cool beans
// outputs "Cool beans!"
```

## Test

Tested!
Try the tests:

```
npm run test
```
