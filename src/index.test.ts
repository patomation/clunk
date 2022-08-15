import test from 'ava'
import { Clunk, parseArgs } from './index'

interface TestCase {
  name: string
  argv: string[]
  expected: Clunk
}
const testCases: TestCase[] = [
  {
    name: "works don't it?",
    argv: [
      '.../node_modules/.bin/ts-node',
      '.../clunk/src/index',
      'compose',
      '--cool',
      'beans',
      '-DE',
      'nice',
    ],
    expected: {
      cool: 'beans',
      d: true,
      e: 'nice',
    },
  },
]

testCases.forEach(({ name, argv, expected }) => {
  test(name, (t) => {
    const clunk = parseArgs(argv)
    t.deepEqual(clunk, expected)
  })
})
