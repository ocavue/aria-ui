export class SelectEvent extends Event {
  constructor() {
    super('select', { bubbles: false })
  }
}
