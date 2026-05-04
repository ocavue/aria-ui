import { once } from '@ocavue/utils'

import { logger } from './logger'

const importOxfmt = once(async () => {
  try {
    return await import('oxfmt')
  } catch (error) {
    logger.error(`Failed to load 'oxfmt' for code formatting: ${error}`)
  }
})

export async function formatFile(filePath: string, contents: string): Promise<string> {
  const oxfmt = await importOxfmt()
  if (!oxfmt) return contents

  const result = await oxfmt.format(filePath, contents, {
    objectWrap: 'collapse',
    printWidth: 320,
    singleQuote: true,
    sortImports: true,
  })
  for (const error of result.errors) {
    const message = `Unable to format ${filePath}: ${error.message}`
    logger.error(message)
    throw new Error(message)
  }

  return result.code
}
