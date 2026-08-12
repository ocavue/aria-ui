export class SelectEvent extends Event {
  /**
   * The value of the selected item.
   */
  readonly detail: string

  constructor(value: string) {
    super('select', { bubbles: false })
    this.detail = value
  }
}
