import test from 'ava'
import { Clunk, parseArgs } from './index'

interface TestCase {
  name: string
  argv: string[]
  expected: Clunk
}
const defaultArgs = ['.../node_modules/.bin/ts-node', '.../clunk/src/index']
const testCases: TestCase[] = [
  {
    name: "works don't it?",
    argv: [...defaultArgs, '--cool', 'beans', '-DE', 'nice'],
    expected: {
      cool: 'beans',
      d: true,
      e: 'nice',
    },
  },
  {
    name: 'long flags can be booleans',
    argv: [...defaultArgs, '--test', '---test2'],
    expected: {
      test: true,
      test2: true,
    },
  },
  {
    name: 'explicit booleans',
    argv: [...defaultArgs, '--nice', 'false', '-o', 'false', '-b', 'true'],
    expected: {
      nice: false,
      o: false,
      b: true,
    },
  },
  {
    name: 'support numbers',
    argv: [...defaultArgs, '--number1', '42', '-a', '10'],
    expected: {
      number1: 42,
      a: 10,
    },
  },
  {
    name: 'handles prefix suffix',
    argv: [...defaultArgs, 'command', '-abc', 'foo', '.'],
    expected: {
      prefix: 'command',
      a: true,
      b: true,
      c: 'foo',
      suffix: '.',
    },
  },
]

function getName(name: string, [, , ...argv]: string[]): string {
  return `${name} | ${argv.join(' ')}`
}

testCases.forEach(({ name, argv, expected }) => {
  test(getName(name, argv), (t) => {
    const clunk = parseArgs(argv)
    t.deepEqual(clunk, expected)
  })
})
