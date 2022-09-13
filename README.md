# Clunk

Command Line Argument Parser helper library.

## Features

- Written in Typescript.
- (SMALL)[https://bundlephobia.com/package/clunk].

![flavorite](https://raw.githubusercontent.com/patomation/clunk/master/patrick-star.png)

## Install

```
npm install clunk
```

## USAGE Example

```JS
import {clunk} from "clunk"
const {flags} = clunk()
console.log(`Cool ${flags.cool}!`)
```

Then you could do

```
$ node index.js --cool beans
// outputs "Cool beans!"
```

### Inputs are allowed

```JS
// $ node index.js start server --port 8080 ./src
const {inputs, flags} = clunk()
const [mainCommand, secondaryOption, targetPath] = inputs
if(mainCommand === "start") {
  if (secondaryOption === "server) {
    startServer(flags.port, targetPath)
  }
}
```

### Configs are highly suggested

Make the use of aliases quite more explicit.
Aliases will work on there own without a config but its hard to tell when to take the next item or be a boolean.

```TS
import {Config, clunk} from "clunk"
const config: Config = {
  time: {
    type: Number,
    alias: "t"
  },
  alpha: {
    type: Boolean,
    alias: "a"
  },
  bravo: {
    type: String,
    alias: "b"
  }
}
const {inputs, flags} = clunk(config)
// $ node index.js image run -t 777 -a this-will-be-an-input -b this-is-a-flag
console.log({inputs, flags})
// {
//   inputs: ["image", "run", "this-will-be-an-input"],
//   flags: {t: 777, a: true b: "this-is-a-flag"}
// }
```

#### Docker CLI Example

Not that we are trying to rebuild docker or anything. But a command like this should work:

```s
$ docker run -dit --rm --name react-boilerplate-app -p 8080:80 react-boilerplate-image
```

Here's an example config that would handle something like this

```TS
import {Config, clunk} from "clunk"
const config: Config = {
  d: {type: Boolean},
  i: {type: Boolean},
  t: {type: Boolean},
  rm: {type: Boolean},
  name: {type: String},
  port: {
    type: String
    alias: "p"
  },
}
const {inputs, flags} = clunk(config)
console.log({inputs, flags})
```

Should look something like this:

```json
{
  "inputs": ["run", "react-boilerplate-image"],
  "flags": {
    "d": true,
    "i": true,
    "t": true,
    "rm": true,
    "name": "react-boilerplate-app",
    "port": "8080:80"
  }
}
```

## Test

Tested!
Try the tests:

```
npm run test
```
