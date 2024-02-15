import test from 'ava'
import { parseValue } from './parseValue'

interface TestCase {
  name: string
  input: string
  expected?: boolean | number | string
}

const testCases: TestCase[] = [
  {
    name: 'boolean false',
    input: 'false',
    expected: false,
  },
  {
    name: 'boolean true',
    input: 'true',
    expected: true,
  },
  { name: 'number 1', input: '1', expected: 1 },
  { name: 'number 0', input: '0', expected: 0 },
  {
    name: 'regular text',
    input: 'text',
    expected: 'text',
  },
]

testCases.forEach(({ name, input, expected }) => {
  test(name, (t) => {
    const actual = parseValue(input)
    t.deepEqual(actual, expected)
  })
})
