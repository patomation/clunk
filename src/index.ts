import { generateHelp } from './lib/generateHelp'

export interface Clunk {
  inputs: string[]
  flags: {
    [key: string]: string | boolean | number | null
  }
}

export interface ConfigItem {
  description?: string
  type: typeof Boolean | typeof String | typeof Number
  alias?: string
}
export interface Config {
  [name: string]: ConfigItem
}

export type Flags<C extends Config> = {
  [key in keyof C]: ReturnType<C[key]['type']>
}

function getConfigFlagByAlias(config: Config, alias: string): string | null {
  let matchingFlag: string | null = null
  Object.entries(config).find(([flag, configItem]) => {
    const isMatch: boolean = configItem.alias === alias
    if (isMatch) matchingFlag = flag
    return isMatch
  })
  return matchingFlag
}

function toBoolean(text: string): boolean | null {
  return text === 'true' ? true : text === 'false' ? false : null
}

export function parser(
  [item, ...rest]: string[],
  config: Config,
  inputs: Clunk['inputs'] = [],
  flags: Clunk['flags'] = {}
): Clunk {
  if (!item) return { inputs, flags }
  const [char1, char2] = Array.from(item)
  const isLongFlag = char2 === '-'
  const isShortFlag = !isLongFlag && char1 === '-'
  const flag = item.replace(/-/g, '')
  const isNextItemFlag: boolean = Array.from(rest[0] || '')[0] === '-'
  if (isLongFlag) {
    const flagType = config[flag]?.type
    if (rest[0]) {
      const nextBoolean = toBoolean(rest[0])
      if (isNextItemFlag) {
        flags[flag] = true
      } else {
        if (flagType === Boolean) {
          flags[flag] = nextBoolean !== null ? nextBoolean : true
          if (nextBoolean !== null && rest[0]) rest.shift()
        } else if (flagType === String) {
          flags[flag] = String(rest[0])
          rest.shift()
        } else if (flagType === Number) {
          flags[flag] = Number(rest[0])
          rest.shift()
        } else if (nextBoolean !== null) {
          flags[flag] = nextBoolean
          rest.shift()
        } else if (flag.length > 1) {
          flags[flag] = rest[0]
          rest.shift()
        } else if (flag.length === 1 && rest[0] && rest[1]) {
          flags[flag] = rest[0]
          rest.shift()
        } else {
          flags[flag] = true
        }
      }
    } else {
      flags[flag] = true
    }
  } else if (isShortFlag) {
    const aliases = Array.from(item.replace(/-/g, '')).map(
      (alias) => `--${getConfigFlagByAlias(config, alias) || alias}`
    )
    // Send them back through
    rest = [...aliases, ...rest]
  } else {
    inputs.push(item)
  }
  const result =
    rest.length > 0 ? parser(rest, config, inputs, flags) : { inputs, flags }

  return result
}

export function clunk<C extends Config>(
  config?: C
): { inputs: string[]; flags: Flags<C> } {
  const [, , ...rest] = process.argv
  const { flags, inputs } = parser(rest, config || {})
  if (flags.help || flags.h) {
    console.log(generateHelp(config))
    process.exit()
  }
  return { flags: flags as Flags<C>, inputs }
}
