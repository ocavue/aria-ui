/**
 * Adds the given custom element to the custom element registry.
 */
export function registerCustomElement(name: string, constructor: CustomElementConstructor): void {
  if (seen.has(name)) return
  seen.add(name)

  if (typeof window !== 'undefined') {
    const customElements = window.customElements
    if (customElements && !customElements.get(name)) {
      customElements.define(name, constructor)
    }
  }
}

const seen = new Set<string>()
