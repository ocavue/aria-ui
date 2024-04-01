import "./combobox-preview.css"

import {
  ComboboxItemElement,
  ComboboxListElement,
  ComboboxRootElement,
} from "@aria-ui/combobox"
import {
  PopoverRootElement,
  PopoverContentElement,
  PopoverTriggerElement,
} from "@aria-ui/popover"
import { html, render } from "lit-html"

customElements.define("aui-combobox-root", ComboboxRootElement)
customElements.define("aui-combobox-list", ComboboxListElement)
customElements.define("aui-combobox-item", ComboboxItemElement)
customElements.define("aui-popover-root", PopoverRootElement)
customElements.define("aui-popover-content", PopoverContentElement)
customElements.define("aui-popover-trigger", PopoverTriggerElement)

function query(selector: string): HTMLElement {
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Element not found: ${selector}`)
  }
  return element as HTMLElement
}

render(
  html`
    <aui-popover-root>
      <aui-popover-trigger>Open</aui-popover-trigger>
      <aui-popover-content .placement=${"bottom"}>
        <aui-combobox-root>
          <input type="text" />
          <aui-combobox-list>
            <aui-combobox-item .value=${"option1"}>Option 1</aui-combobox-item>
            <aui-combobox-item .value=${"option2"}>Option 2</aui-combobox-item>
            <aui-combobox-item .value=${"option3"}>Option 3</aui-combobox-item>
            <aui-combobox-item .value=${"option11"}>Option 11</aui-combobox-item>
            <aui-combobox-item .value=${"option12"}>Option 12</aui-combobox-item>
            <aui-combobox-item .value=${"option13"}>Option 13</aui-combobox-item>
          </aui-combobox-list>
        </aui-combobox-root>
      </aui-popover-content>
    </aui-popover-root>
  `,
  query(".example-combobox-preview"),
)
