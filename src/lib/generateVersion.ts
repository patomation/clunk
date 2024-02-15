import { Options } from '..'

export function generateVersion(
  options: Options = {}
) {
  return [
    options?.name || '',
    options?.version || '',
  ]
    .filter((s) => !!s)
    .join(' ')
    .trim()
}
