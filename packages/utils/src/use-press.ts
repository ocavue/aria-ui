import type { HostElement } from '@aria-ui/core'

import { useEventListener } from './use-event-listener.ts'

const COMPOSITION_TAIL_MS = 50

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

  // Workaround for WebKit firing compositionend before the keydown that commits an
  // IME composition, which makes that keydown report `isComposing` as false.
  // https://bugs.webkit.org/show_bug.cgi?id=165004
  // https://bugs.webkit.org/show_bug.cgi?id=311717
  let compositionEndedAt = -1
  const disposeCompositionEnd = useEventListener(
    host,
    'compositionend',
    (event) => {
      compositionEndedAt = event.timeStamp
    },
    { capture: true, passive: true },
  )

  const disposeKeyDown = useEventListener(host, 'keydown', (event) => {
    if (event.isComposing || event.timeStamp < compositionEndedAt + COMPOSITION_TAIL_MS) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handler()
    }
  })

  return () => {
    disposeClick()
    disposeCompositionEnd()
    disposeKeyDown()
  }
}
