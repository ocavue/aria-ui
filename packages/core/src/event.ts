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
