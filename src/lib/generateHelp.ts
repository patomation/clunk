import { Config, Options } from ".."
import { generateVersion } from "./generateVersion"


const helpTemplate = (optionsString: string, options?: Options) => `
${options ? generateVersion(options) : ""}

Usage:

Options
  ${optionsString}
`

const len = (text: string): number =>  Array.from(text).length

export function generateHelp (config?: Config, options?: Options) {
  const entries = Object.entries(config || {})
  const longestFlag = entries
    .reduce((prev, [flag]) => {
      const length = len(flag)
      return length > prev ? length : prev 
    }, 0)
  const optionsString = entries
    .map(([flag, {alias, type, description}]) => 
    [
      alias ? `-${alias}` : '    ', `--${flag}`,
      // Spacer
      new Array(longestFlag - len(flag) + 2).fill(" ").join(""),
      description,
      `${typeof type()}`
    ]
    .filter((item) => item)
    .join("  ")
  ).join("\n")
  return helpTemplate(optionsString, options)
}