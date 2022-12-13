import { Options } from "..";

export function generateVersion (options: Options = {}) {
  return `${options?.name ? `${options?.name} ` : ""}${options?.version}`
}