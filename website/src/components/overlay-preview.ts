import { BaseElement, type SingalState } from "@aria-ui/core"
import {
  useOverlayAnchor,
  useOverlayPositioner,
  useOverlayRoot,
  type OverlayPositionerProps,
} from "@aria-ui/overlay"
import { html, render } from "lit-html"

export class OverlayAnchor extends BaseElement {
  constructor() {
    super()
    useOverlayAnchor(this)
  }
}

export class OverlayPositioner extends BaseElement {
  readonly state: SingalState<OverlayPositionerProps>

  constructor() {
    super()
    this.state = useOverlayPositioner(this)
  }

  get placement() {
    return this.state.placement.value
  }
  set placement(placement:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end") {
    this.state.placement.value = placement
  }

  get offset() {
    return this.state.offset.value as number
  }
  set offset(value: number) {
    this.state.offset.value = value
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute("data-placement", this.placement)
  }
}

export class OverlayRoot extends BaseElement {
  constructor() {
    super()
    useOverlayRoot(this)
  }
}

customElements.define("aui-overlay-root", OverlayRoot)
customElements.define("aui-overlay-anchor", OverlayAnchor)
customElements.define("aui-overlay-positioner", OverlayPositioner)

function query(selector: string): HTMLElement {
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Element not found: ${selector}`)
  }
  return element as HTMLElement
}

render(
  html`
    <aui-overlay-root
      style="display: flex; box-sizing: border-box; margin-top: 80px; justify-content: center; width: 100%; padding: 80px;"
    >
      <aui-overlay-anchor
        style="display: block; width: 100%; max-width: 320px;"
      >
        <button style="width: 100%; height: 160px;">Anchor</button>
      </aui-overlay-anchor>
      ${(
        [
          "top-start",
          "top",
          "top-end",
          "bottom-start",
          "bottom",
          "bottom-end",
          "left-start",
          "left",
          "left-end",
          "right-start",
          "right",
          "right-end",
        ] as const
      ).map((placement) => {
        return html`
          <aui-overlay-positioner
            style="display: block; margin: 0;"
            .placement=${placement}
            .offset=${4}
          >
            <button>${placement}</button>
          </aui-overlay-positioner>
        `
      })}
    </aui-overlay-root>
  `,
  query(".example-overlay-preview"),
)
