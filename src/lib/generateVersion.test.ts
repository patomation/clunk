import test from 'ava'
import { Options } from '..'
import { generateVersion } from './generateVersion'

interface TestCase {
  name: string
  options?: Options
  expected?: string
}

const testCases: TestCase[] = [
  {
    name: 'name and version',
    options: {
      name: 'Clunk Cli',
      version: '1.0.0',
    },
    expected: 'Clunk Cli 1.0.0',
  },
  {
    name: 'version only',
    options: {
      version: '1.0.0',
    },
    expected: '1.0.0',
  },
  {
    name: 'no options',
    options: undefined,
    expected: '',
  },
  {
    name: 'empty options',
    options: {},
    expected: '',
  },
]

testCases.forEach(
  ({ name, options, expected }) => {
    test(name, (t) => {
      const actual = generateVersion(options)
      t.deepEqual(actual, expected)
    })
  }
)
