/**
 * Applies style changes with CSS transitions disabled, so that the element
 * jumps to its new styles instead of animating from the old ones.
 *
 * Reading `offsetWidth` in between forces a synchronous style flush, the same
 * force-reflow trick used by Bootstrap's `reflow()`, MUI's `reflow()`, Vue's
 * `forceReflow()`, and react-transition-group's `forceReflow()`. Without it,
 * the browser would coalesce the writes and the restored transition would
 * animate them.
 */
export function applyStylesWithoutTransition(
  element: HTMLElement,
  applyStyles: VoidFunction,
): void {
  const inlineTransition = element.style.transition
  element.style.transition = 'none'
  applyStyles()
  void element.offsetWidth
  element.style.transition = inlineTransition
}
