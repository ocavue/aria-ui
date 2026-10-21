export class OpenChangeCompleteEvent extends Event {
  /**
   * Whether the overlay is open.
   */
  readonly detail: boolean

  constructor(open: boolean) {
    super('openChangeComplete')
    this.detail = open
  }
}
