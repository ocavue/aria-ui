function getValue(element: HTMLElement): string {
  return (
    (element as HTMLOptionElement).value ||
    element.textContent ||
    element.innerText ||
    element.innerHTML
  )
}

function isDisabled(element: HTMLElement): boolean {
  return (
    (element as HTMLOptionElement).disabled ||
    element.getAttribute("aria-disabled") === "true" ||
    element.getAttribute("aria-hidden") === "true"
  )
}

export class Collection {
  private _items: HTMLElement[] = []
  private _indexes = new Map<string, number>()

  constructor(
    items: Iterable<HTMLElement>,
    readonly loop = true,
  ) {
    for (const item of items) {
      const value = getValue(item)
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

  private _find(startIndex: number, dir: 1 | -1): string | null {
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
      if (!isDisabled(item)) {
        return getValue(item)
      }

      index += dir
    }
    return null
  }

  /**
   * Returns the first enabled value.
   */
  first(): string | null {
    return this._find(0, +1)
  }

  /**
   * Returns the last enabled value.
   */
  last(): string | null {
    return this._find(this.size() - 1, -1)
  }

  /**
   * Returns the next enabled value.
   */
  next(value: string | null): string | null {
    if (value == null) {
      return this.first()
    }

    const index = this._indexes.get(value)
    if (index == null) {
      return this.first()
    }

    return this._find(index + 1, +1)
  }

  /**
   * Returns the previous enabled value.
   */
  prev(value: string | null): string | null {
    if (value == null) {
      return this.last()
    }

    const index = this._indexes.get(value)
    if (index == null) {
      return this.last()
    }

    return this._find(index - 1, -1)
  }

  /**
   * Finds an element from its value.
   */
  getElement(value: string): HTMLElement | null {
    const index = this._indexes.get(value)
    if (index == null) return null
    return this._items[index]
  }

  /**
   * Returns all values.
   */
  getValues(): string[] {
    return this._items.map(getValue)
  }
}

/**
 * A simple case-insensitive substring match filter.
 */
export const defaultItemFilter: ItemFilter = ({ value, query }) => {
  if (!query) {
    return true
  }

  return value
    .toLowerCase()
    .replace(/\s/g, "")
    .includes(query.toLowerCase().replace(/\s/g, ""))
}

/**
 * The filter function to determine if an item should be shown in the collection.
 */
export type ItemFilter = (options: {
  value: string
  query: string
}) => boolean
