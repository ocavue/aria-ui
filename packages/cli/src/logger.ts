import { createDebug } from 'obug'



export const logger = {
  debug: createDebug('aria-ui:debug'),
  info: (message: string) => {
    // eslint-disable-next-line no-console
    console.info(`[aria-ui] ${message}`)
  },
  error: (message: string) => {
    console.error(`[aria-ui] ${message}`)
  },
}
