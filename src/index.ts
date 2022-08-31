export interface Clunk {
  [key: string]: string | boolean | number
}

enum Flag {
  SHORT,
  LONG,
}

function whatFlag(text: string = ''): Flag | null {
  const characters = Array.from(text)
  const DASH = '-'
  const isSingleDash = characters[0] === DASH
  const isDoubleDash = characters[1] === DASH
  return isDoubleDash ? Flag.LONG : isSingleDash ? Flag.SHORT : null
}

function removeDashes(text: string): string {
  return text.replace(/-/g, '')
}

function getValue(text: string): string | boolean | number {
  return text && whatFlag(text) === null
    ? text === 'false'
      ? false
      : text === 'true'
      ? true
      : isNaN(Number(text || ''))
      ? text
      : Number(text)
    : true
}

export function parseArgs(argv: string[]): Clunk {
  const hash: Clunk = {}
  const [, , ...rest] = argv
  for (let i = 0; i < rest.length; i++) {
    const text = rest[i]
    const nextText = rest[i + 1]
    const flagKind = whatFlag(text)

    if (flagKind === Flag.SHORT) {
      // Handle multiple short combined keys
      const keys = Array.from(removeDashes(text).toLowerCase())
      keys.forEach((key, i) => {
        // The last one should get the text argument the first ones should be booleans
        hash[key] = keys.length - 1 === i ? getValue(nextText) : true
      })
    } else if (flagKind === Flag.LONG) {
      const key = removeDashes(text).toLowerCase()
      hash[key] = getValue(nextText)
    } else {
      const previousFlag = whatFlag(rest[i - 1])
      if (i === 0) {
        hash.prefix = text
      } else if (previousFlag === null && rest.length - 1 === i) {
        hash.suffix = text
      }
    }
  }
  return hash
}

export function clunk(): Clunk {
  return parseArgs(process.argv)
}
