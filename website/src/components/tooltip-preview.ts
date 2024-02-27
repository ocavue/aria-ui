import { BaseElement, type SingalState } from "@aria-ui/core"
import {
  useTooltipTrigger,
  useTooltipPositioner,
  useTooltipRoot,
  type TooltipPositionerProps,
} from "@aria-ui/tooltip"
import { html, render } from "lit-html"

export class TooltipTrigger extends BaseElement {
  constructor() {
    super()
    useTooltipTrigger(this)
  }
}

export class TooltipPositioner extends BaseElement {
  readonly state: SingalState<TooltipPositionerProps>

  constructor() {
    super()
    this.state = useTooltipPositioner(this)
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

export class TooltipRoot extends BaseElement {
  constructor() {
    super()
    useTooltipRoot(this)
  }
}

customElements.define("aui-tooltip-root", TooltipRoot)
customElements.define("aui-tooltip-trigger", TooltipTrigger)
customElements.define("aui-tooltip-positioner", TooltipPositioner)

function query(selector: string): HTMLElement {
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Element not found: ${selector}`)
  }
  return element as HTMLElement
}

render(
  html`
    <aui-tooltip-root
      style="display: inline-block; width: min-content; margin: 32px 8px;"
    >
      <aui-tooltip-trigger style="display: block; width: max-content;">
        <button>Hovering me</button>
      </aui-tooltip-trigger>
      <aui-tooltip-positioner
        style="display: block; margin: 0; border: 1px solid red; padding: 4px 8px;"
        .offset=${4}
      >
        <div>Tooltip</div>
      </aui-tooltip-positioner>
    </aui-tooltip-root>

    <aui-tooltip-root
      style="display: inline-block; width: min-content; margin: 32px 8px;"
    >
      <aui-tooltip-trigger style="display: block; width: max-content;">
        <button>Hovering me</button>
      </aui-tooltip-trigger>
      <aui-tooltip-positioner
        style="display: block; margin: 0; border: 1px solid red; padding: 4px 8px;"
        .offset=${4}
      >
        <div>Tooltip</div>
      </aui-tooltip-positioner>
    </aui-tooltip-root>
  `,
  query(".example-tooltip-preview"),
)
