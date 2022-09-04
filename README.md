# Clunk

Command Line Argument Parser helper library.

## Features

- Written in Typescript.
- SMALL.

![flavorite](https://raw.githubusercontent.com/patomation/clunk/master/patrick-star.png)

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
