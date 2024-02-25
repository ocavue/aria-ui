/**
 * Returns a heading in markdown format
 * @param level The level of the heading
 * @param text The text of the heading
 */
export function heading(level: number, text: string) {
  return `${"#".repeat(Math.min(6, level))} ${text}`
}
