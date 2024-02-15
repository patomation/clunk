import test from 'ava'
import {
  generateHelp,
  helpTemplate,
} from './generateHelp'
import { Config, Options } from '..'

interface TestCase {
  name: string
  config?: Config
  options?: Options
  expected?: string
}

const testCases: TestCase[] = [
  {
    name: 'regular test',
    config: {},
    options: {},
    expected: helpTemplate('', {}),
  },
  {
    name: 'one feature flag',
    config: {
      feature: {
        type: Boolean,
        alias: 'f',
      },
    },
    options: {},
    expected: helpTemplate(
      '-f  --feature      boolean',
      {}
    ),
  },
  {
    name: 'many feature flag',
    config: {
      featureA: {
        type: Boolean,
        alias: 'a',
      },
      featureB: {
        type: String,
        alias: 'b',
      },
      featureC: {
        type: Number,
      },
    },
    options: {},
    expected: helpTemplate(
      [
        '-a  --featureA      boolean',
        '-b  --featureB      string',
        '      --featureC      number',
      ].join('\n'),
      {}
    ),
  },
]

testCases.forEach(
  ({ name, config, options, expected }) => {
    test(name, (t) => {
      const actual = generateHelp(config, options)
      t.deepEqual(actual, expected)
    })
  }
)
