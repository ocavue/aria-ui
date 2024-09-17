/**
 * Defines options for an event.
 */
export type EventDeclaration = {
  /**
   * Whether the event bubbles.
   * @default false
   */
  bubbles?: boolean

  /**
   * Whether the event is cancelable.
   * @default true
   */
  cancelable?: boolean

  /**
   * Whether the event is composed.
   * @default false
   */
  composed?: boolean
}

/**
 * Map of event types to EventDeclaration options.
 */
export type EventDeclarations<
  Events extends { [EventType in keyof Events]: CustomEvent },
> = {
  [EventType in keyof Events]: EventDeclaration
}

export function defineEmit<
  Events extends { [EventType in keyof Events]: CustomEvent },
>(element: HTMLElement, events: EventDeclarations<Events>) {
  return function emit(
    type: keyof Events,
    detail: Events[keyof Events]["detail"],
  ) {
    const declaration = events[type]
    if (!declaration) {
      throw new Error(`Event type "${String(type)}" is not defined`)
    }

    const bubbles = declaration.bubbles ?? false
    const cancelable = declaration.cancelable ?? true
    const composed = declaration.composed ?? false

    const event = new CustomEvent(type as string, {
      detail,
      bubbles,
      cancelable,
      composed,
    })

    element.dispatchEvent(event)
  }
}
