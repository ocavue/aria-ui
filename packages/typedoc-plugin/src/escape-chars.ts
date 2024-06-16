export function escapeChars(str: string) {
  return str
    .replace(/>/g, String.raw`\>`)
    .replace(/</g, String.raw`\<`)
    .replace(/{/g, String.raw`\{`)
    .replace(/_/g, String.raw`\_`)
    .replace(/`/g, "\\`")
    .replace(/\|/g, String.raw`\|`)
    .replace(/\*/g, String.raw`\*`)
}
