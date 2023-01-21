import test from 'ava'
import { clunk, Clunk, Config, parser } from './index'
import mockArgv from 'mock-argv'

interface TestCase {
  name: string
  args: string
  config?: Config | null
  expected: Clunk
  only?: boolean
}
const defaultArgs = ['.../node_modules/.bin/ts-node', '.../clunk/src/index']
const testCases: TestCase[] = [
  {
    name: 'passing config boolean will make last arg an input',
    args: 'command --test -abc . --zoo true --zuu true biz --bar good -h fiz --num 8080 -t',
    config: {
      test: {
        type: Boolean,
      },
      alpha: {
        alias: 'a',
        type: Boolean,
      },
      beta: {
        alias: 'b',
        type: Boolean,
      },
      charley: {
        alias: 'c',
        type: Boolean,
      },
      zoo: {
        type: String,
      },
      num: {
        type: Number,
      },
    },
    expected: {
      flags: {
        alpha: true,
        bar: 'good',
        beta: true,
        charley: true,
        h: 'fiz',
        num: 8080,
        test: true,
        zoo: 'true',
        zuu: true,
        t: true,
      },
      inputs: ['command', '.', 'biz'],
    },
  },
  {
    name: 'no config',
    args: 'command --test --dave ok -p 8080 -bcd .',
    config: null,
    expected: {
      inputs: ['command', '.'],
      flags: {
        test: true,
        dave: 'ok',
        p: '8080',
        b: true,
        c: true,
        d: true,
      },
    },
  },
  {
    name: 'Config Boolean Edge Cases',
    args: '--foo bar',
    config: {
      foo: { type: Boolean },
    },
    expected: {
      inputs: ['bar'],
      flags: {
        foo: true,
      },
    },
  },
  {
    name: 'Config explicit true Boolean Edge Cases',
    args: '--foo true',
    config: {
      foo: { type: Boolean },
    },
    expected: {
      inputs: [],
      flags: {
        foo: true,
      },
    },
  },
  {
    name: 'Config explicit false Boolean Edge Cases',
    args: '--foo false',
    config: {
      foo: { type: Boolean },
    },
    expected: {
      inputs: [],
      flags: {
        foo: false,
      },
    },
  },
  {
    name: 'Config String Edge Cases',
    args: '--foo true',
    config: {
      foo: { type: String },
    },
    expected: {
      inputs: [],
      flags: {
        foo: 'true',
      },
    },
  },
  {
    name: 'Config Number Edge Cases',
    args: '--port 8080',
    config: {
      port: { type: Number },
    },
    expected: {
      inputs: [],
      flags: {
        port: 8080,
      },
    },
  },
  {
    name: 'un-configured Boolean Edge Cases',
    args: '--foo',
    config: null,
    expected: {
      inputs: [],
      flags: {
        foo: true,
      },
    },
  },
  {
    name: 'un-configured explicit true Boolean Edge Cases',
    args: '--foo true',
    config: null,
    expected: {
      inputs: [],
      flags: {
        foo: true,
      },
    },
  },
  {
    name: 'un-configured explicit false Boolean Edge Cases',
    args: '--foo false',
    config: null,
    expected: {
      inputs: [],
      flags: {
        foo: false,
      },
    },
  },
  {
    name: 'Alias Support',
    args: '-p 9000 -b',
    config: {
      port: {
        type: Number,
        alias: 'p',
      },
    },
    expected: {
      inputs: [],
      flags: {
        port: 9000,
        b: true,
      },
    },
  },
  {
    name: 'Collects input',
    args: 'command -abc .',
    config: null,
    expected: {
      inputs: ['command', '.'],
      flags: {
        a: true,
        b: true,
        c: true,
      },
    },
  },
  {
    name: 'Accepts = syntax',
    args: '--alpha=true --beta=0100 --charley=test',
    config: null,
    expected: {
      inputs: [],
      flags: {
        alpha: true,
        beta: 100,
        charley: 'test',
      },
    },
  },
]

function getName(name: string, args: string): string {
  return `${name} | ${args}`
}

const hasOnly = testCases.some(({ only }) => only)
testCases.forEach(({ name, args, config, expected, only }) => {
  if (hasOnly && !only) return
  test(getName(name, args), (t) => {
    const clunk = parser(args.split(' '), config || {})
    t.deepEqual(clunk, expected)
  })
})

test('clunk test', async (t) => {
  mockArgv(['-a'], async () => {
    const args = clunk({
      a: {
        type: Boolean,
      },
    })
    t.assert(args.flags.a)
  })
})

test('clunk null Config', async (t) => {
  mockArgv(['-a'], async () => {
    const args = clunk()
    t.assert(args.flags.a)
  })
})

test('clunk null args', async (t) => {
  mockArgv([], async () => {
    const args = clunk()
    t.deepEqual(args, {
      flags: {},
      inputs: [],
    })
  })
})
