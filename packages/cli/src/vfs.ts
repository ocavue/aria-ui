import fs from 'node:fs'
import path from 'node:path'

import { logger } from './logger'

interface File {
  content: string
  deleted: boolean
}

const pending = new Map<string, File>()

function readdir(dirPath: string): string[] {
  try {
    return fs.readdirSync(dirPath)
  } catch {
    return []
  }
}

function writeFile(filePath: string, content: string): void {
  const resolved = path.resolve(filePath)
  pending.set(resolved, { content, deleted: false })
}

function rm(filePath: string): void {
  const resolved = path.resolve(filePath)
  pending.set(resolved, { content: '', deleted: true })
}

/**
 * Flush all buffered operations to disk.
 *
 * - Removals are executed first.
 * - Then writes are executed, but only if the file content differs
 *   from what's already on disk.
 * - Parent directories are created automatically before writing.
 */
function commit(): void {
  // Execute removals first
  for (const [filePath, file] of pending) {
    if (!file.deleted) continue

    try {
      fs.rmSync(filePath)
      logger.debug(`Removed ${filePath}`)
    } catch {
      // File may already be gone, that's fine
    }
  }

  // Execute writes, skipping unchanged files
  for (const [filePath, file] of pending) {
    if (file.deleted) continue

    let existing: string | undefined
    try {
      existing = fs.readFileSync(filePath, 'utf-8')
    } catch {
      // File doesn't exist yet, that's fine
    }

    if (existing === file.content) {
      logger.debug(`Skipped ${filePath} (unchanged)`)
      continue
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, file.content)
    logger.debug(`Generated ${filePath}`)
  }

  pending.clear()
}

export const vfs = { readdir, writeFile, rm, commit }
