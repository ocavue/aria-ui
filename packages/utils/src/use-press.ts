import type { HostElement } from '@aria-ui/core'

import { useEventListener } from './use-event-listener.ts'

/*
 * Attaches "press" interaction to a host element, handling both pointer and
 * keyboard input. The callback fires on:
 *
 * - `click` events (covers mouse, touch, and assistive technology)
 * - `keydown` events for Enter and Space keys (keyboard navigation)
 *
 * The keydown handler is needed because non-button elements (e.g. custom
 * elements with role="button") do not natively fire `click` on Enter/Space.
 * This follows the WAI-ARIA Button Pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export function usePress(host: HostElement, handler: () => void): VoidFunction {
  const disposeClick = useEventListener(host, 'click', handler)

  const disposeKeyDown = useEventListener(host, 'keydown', (event) => {
    if (event.isComposing) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handler()
    }
  })

  return () => {
    disposeClick()
    disposeKeyDown()
  }
}
