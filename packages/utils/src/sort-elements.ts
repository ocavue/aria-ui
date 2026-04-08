export function sortElements(elements: Iterable<HTMLElement>): HTMLElement[] {
  return [...elements].sort((a, b) => {
    const pos = a.compareDocumentPosition(b)
    if (pos & (4 satisfies typeof Node.DOCUMENT_POSITION_FOLLOWING)) return -1
    if (pos & (2 satisfies typeof Node.DOCUMENT_POSITION_PRECEDING)) return 1
    return 0
  })
}
