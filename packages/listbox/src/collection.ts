class Node {
  constructor(
    public element: HTMLElement,
    public prev?: Node,
    public next?: Node,
  ) {}

  get value(): string {
    return (
      (this.element as HTMLOptionElement).value ||
      this.element.textContent ||
      this.element.innerText ||
      this.element.innerHTML
    )
  }

  get disabled(): boolean {
    return (
      (this.element as HTMLOptionElement).disabled ||
      this.element.getAttribute("aria-disabled") === "true" ||
      this.element.getAttribute("aria-hidden") === "true"
    )
  }
}

export class Collection {
  private _map = new Map<string, Node>()
  private _head: Node | null = null
  private _tail: Node | null = null

  constructor(
    items: Iterable<HTMLElement>,
    readonly loop = true,
  ) {
    let prev: Node | undefined

    for (const item of items) {
      const node = new Node(item)
      const value = node.value
      if (!value || this._map.has(value)) {
        continue
      }

      this._map.set(value, node)

      if (!this._head) {
        this._head = node
      }
      this._tail = node

      if (prev) {
        node.prev = prev
        prev.next = node
      }

      prev = node
    }

    if (this.loop && this._head && this._tail) {
      this._tail.next = this._head
      this._head.prev = this._tail
    }
  }

  first() {
    return this._head?.value || null
  }

  last() {
    return this._tail?.value || null
  }

  size() {
    return this._map.size
  }

  next(value: string | null): string | null {
    const curr = value == null ? null : this._map.get(value)
    let next = curr?.next ?? this._head

    const size = this.size()
    for (let i = 0; i < size; i++) {
      if (next && !next.disabled) return next.value
      next = next?.next ?? null
    }

    return null
  }

  prev(value: string | null): string | null {
    const curr = value == null ? null : this._map.get(value)
    let prev = curr?.prev ?? this._tail

    const size = this.size()
    for (let i = 0; i < size; i++) {
      if (prev && !prev.disabled) return prev.value
      prev = prev?.prev ?? null
    }

    return null
  }
}
