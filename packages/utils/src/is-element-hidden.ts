/**
 * Whether the element is not rendered, e.g. it or one of its ancestors has
 * `display: none`. Such an element has no box, so `getBoundingClientRect()`
 * returns a zero rect at the viewport origin. Falls back to `false` in
 * browsers without `checkVisibility` support.
 */
export function isElementHidden(element: Element | undefined): boolean {
  if (!element) return false
  if (element.checkVisibility?.() !== false) return false
  // A `display: contents` element has no box of its own, so `checkVisibility`
  // reports it as invisible even though its children still render. Judge by
  // its parent instead.
  if (getComputedStyle(element).display === 'contents') {
    const parent = element.parentElement
    return parent ? isElementHidden(parent) : false
  }
  return true
}
