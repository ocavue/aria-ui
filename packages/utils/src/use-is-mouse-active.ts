import { createSignal, type HostElement } from '@aria-ui/core'

import { useGlobalEventListener } from './use-global-event-listener.ts'

/**
 * Returns a function that tracks whether the mouse is currently active (i.e. the user has recently moved the mouse or clicked).
 *
 * This is useful for components that want to ignore mouse hover styles when the user is using keyboard navigation.
 */
export function useIsMouseActive(host: HostElement): () => boolean {
  const { get: getIsMouseActive, set: setIsMouseActive } = createSignal(false)

  const handleMouseAction = () => setIsMouseActive(true)
  const handleKeyboardAction = () => setIsMouseActive(false)

  useGlobalEventListener(host, 'mousemove', handleMouseAction)
  useGlobalEventListener(host, 'mousedown', handleMouseAction)
  useGlobalEventListener(host, 'keydown', handleKeyboardAction)

  return getIsMouseActive
}
