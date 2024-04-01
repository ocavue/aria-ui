import "./select-preview.css"

import {
  SelectItemElement,
  SelectListElement,
  SelectContentElement,
  SelectRootElement,
  SelectTriggerElement,
  SelectValueElement,
} from "@aria-ui/select"
import { html, render } from "lit-html"

customElements.define("aui-select-root", SelectRootElement)
customElements.define("aui-select-list", SelectListElement)
customElements.define("aui-select-item", SelectItemElement)
customElements.define("aui-select-value", SelectValueElement)
customElements.define("aui-select-trigger", SelectTriggerElement)
customElements.define("aui-select-content", SelectContentElement)

function query(selector: string): HTMLElement {
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Element not found: ${selector}`)
  }
  return element as HTMLElement
}

render(
  html`
    <aui-select-root>
      <aui-select-trigger>
        <aui-select-value .placeholder=${"Select an option..."} ></aui-select-value>
      </aui-select-trigger>
      <aui-select-content>
        <aui-select-list>
          <aui-select-item .value=${"option1"}>Option 1</aui-select-item>
          <aui-select-item .value=${"option2"}>Option 2</aui-select-item>
          <aui-select-item .value=${"option3"}>Option 3</aui-select-item>
          <aui-select-item .value=${"option11"}>Option 11</aui-select-item>
          <aui-select-item .value=${"option12"}>Option 12</aui-select-item>
          <aui-select-item .value=${"option13"}>Option 13</aui-select-item>
        </aui-select-list>
      </aui-select-content>
    </aui-select-root>
  `,
  query(".example-select-preview"),
)
