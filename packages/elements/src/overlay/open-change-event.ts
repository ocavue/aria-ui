export class OpenChangeEvent extends Event {
  /**
   * Whether the overlay is open.
   */
  readonly detail: boolean

  constructor(open: boolean) {
    super('openChange', { cancelable: true })
    this.detail = open
  }
}
