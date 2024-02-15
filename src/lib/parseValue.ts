export function parseValue(
  text: string = ''
): boolean | string | number {
  return text === 'true'
    ? true
    : text === 'false'
    ? false
    : isNaN(Number(text))
    ? text
    : Number(text)
}
