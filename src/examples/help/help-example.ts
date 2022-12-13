import { clunk } from '../..'

/**
 * # Help Example
 * Usage:
 * node help-example -h
 * or
 * node help-example --help
 */
const {
  flags: { option1, option2, option3 },
} = clunk({
  option1: {
    type: Boolean,
    description: 'Option 1 description',
    alias: 'a',
  },
  option2: {
    type: String,
    description: 'Option 2 description',
  },
  option3: {
    type: Number,
    description: 'Option 3 description',
  },
  option4: {
    type: Number,
  },
  opt5: {
    type: Number,
  },
})

console.log('This will not execute since process exited early')
