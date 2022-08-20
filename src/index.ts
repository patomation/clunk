export interface Clunk {
  [key: string]: string | boolean
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
        hash[key] =
          keys.length - 1 === i
            ? nextText && whatFlag(nextText) === null
              ? nextText === 'false'
                ? false
                : nextText
              : true
            : true
      })
    } else if (flagKind === Flag.LONG) {
      const key = removeDashes(text).toLowerCase()
      hash[key] =
        nextText && whatFlag(nextText) === null
          ? nextText === 'false'
            ? false
            : nextText
          : true
    }
  }
  return hash
}

export function clunk(): Clunk {
  return parseArgs(process.argv)
}
