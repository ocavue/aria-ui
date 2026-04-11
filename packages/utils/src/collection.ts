/**
 * Get the value of an HTMLElement.
 *
 * @internal
 */
export function getCollectionItemValue(element: HTMLElement): string {
  return (
    (element as HTMLOptionElement).value ||
    element.textContent?.trim() ||
    element.innerText?.trim() ||
    ''
  )
}

function isDisabled(element: HTMLElement): boolean {
  return (
    (element as HTMLOptionElement).disabled ||
    element.getAttribute('aria-disabled') === 'true' ||
    element.getAttribute('aria-hidden') === 'true'
  )
}

/**
 * An ordered collection of items with O(1) lookup and directional traversal.
 * Skips disabled items automatically.
 */
export class Collection {
  private _items: HTMLElement[] = []
  private _indexes = new Map<string, number>()

  constructor(
    items: Iterable<HTMLElement>,
    readonly loop = true,
  ) {
    for (const item of items) {
      const value = getCollectionItemValue(item)
      if (!value || this._indexes.has(value)) {
        continue
      }

      this._indexes.set(value, this._items.length)
      this._items.push(item)
    }
  }

  size(): number {
    return this._items.length
  }

  private _find(startIndex: number, dir: 1 | -1): string | undefined {
    let index = startIndex
    const n = this._items.length

    for (let i = 0; i < n; i++) {
      if (index < 0 || index >= n) {
        if (this.loop) {
          index = (index + n) % n
        } else {
          break
        }
      }

      const item = this._items[index]
      if (item && !isDisabled(item)) {
        return getCollectionItemValue(item)
      }

      index += dir
    }
    return undefined
  }

  first(): string | undefined {
    return this._find(0, +1)
  }

  last(): string | undefined {
    return this._find(this.size() - 1, -1)
  }

  next(value: string | undefined): string | undefined {
    if (value === undefined) {
      return this.first()
    }

    const index = this._indexes.get(value)
    if (index === undefined) {
      return this.first()
    }

    return this._find(index + 1, +1)
  }

  prev(value: string | undefined): string | undefined {
    if (value === undefined) {
      return this.last()
    }

    const index = this._indexes.get(value)
    if (index === undefined) {
      return this.last()
    }

    return this._find(index - 1, -1)
  }

  getElement(value: string): HTMLElement | undefined {
    const index = this._indexes.get(value)
    if (index === undefined) return undefined
    return this._items[index]
  }

  getValues(): string[] {
    return this._items.map(getCollectionItemValue)
  }
}
