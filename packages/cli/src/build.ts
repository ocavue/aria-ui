import path from 'node:path'

import { generateFiles, type Framework, type WrapperExtension } from './generate'
import { logger } from './logger'
import { parse } from './parse'

export interface BuildOptions {
  tsconfig: string
  entry: string
  output: string
  prefix: string
  importSource: string
  framework: Framework
  wrapperExtensions?: WrapperExtension[]
}

export async function build(options: BuildOptions) {
  logger.debug(`Start building`)

  const tsconfigFilePath = path.resolve(options.tsconfig)
  const entryFilePath = path.resolve(options.entry)
  const outputDir = path.resolve(options.output)

  logger.debug(`Loading ${tsconfigFilePath}`)
  logger.debug(`Parsing ${entryFilePath}`)
  const parsed = parse(tsconfigFilePath, entryFilePath)
  logger.debug(`Parsed`)

  logger.debug(`Generating files to ${outputDir}`)
  const count = await generateFiles(parsed, outputDir, {
    prefix: options.prefix,
    importSource: options.importSource,
    framework: options.framework,
    wrapperExtensions: options.wrapperExtensions,
  })
  logger.debug(`Generated files`)
  logger.info(`Generated ${count} files to ${outputDir}`)

  logger.debug(`Done building`)
}
