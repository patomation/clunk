import { Config } from ".."


const helpTemplate = (options: string) => `
Usage:

Options
  ${options}
`

const len = (text: string): number =>  Array.from(text).length

export function generateHelp (config?: Config) {
  const entries = Object.entries(config || {})
  const longestFlag = entries
    .reduce((prev, [flag]) => {
      const length = len(flag)
      return length > prev ? length : prev 
    }, 0)
  const options = entries
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
  return helpTemplate(options)
}