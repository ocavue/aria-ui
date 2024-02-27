import {
  TooltipPositionerElement,
  TooltipRootElement,
  TooltipTriggerElement,
} from "@aria-ui/tooltip"
import { html, render } from "lit-html"

customElements.define("aui-tooltip-root", TooltipRootElement)
customElements.define("aui-tooltip-trigger", TooltipTriggerElement)
customElements.define("aui-tooltip-positioner", TooltipPositionerElement)

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
