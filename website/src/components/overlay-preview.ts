import {
  OverlayAnchorElement,
  OverlayPositionerElement,
  OverlayRootElement,
} from "@aria-ui/overlay"
import { html, render } from "lit-html"

customElements.define("aui-overlay-root", OverlayRootElement)
customElements.define("aui-overlay-anchor", OverlayAnchorElement)
customElements.define("aui-overlay-positioner", OverlayPositionerElement)

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
            placement=${placement}
            offset=4
          >
            <button>${placement}</button>
          </aui-overlay-positioner>
        `
      })}
    </aui-overlay-root>
  `,
  query(".example-overlay-preview"),
)
