import {
  ComboboxEmptyElement,
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
customElements.define("aui-combobox-empty", ComboboxEmptyElement)
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
      <aui-popover-trigger>
        <button>Open</button>
      </aui-popover-trigger>
      <aui-popover-content .placement=${"bottom"} .fitViewport=${true}>
        <aui-combobox-root>
          <input type="text" />
          <aui-combobox-list>
            ${Array.from({ length: 100 }, (_, index) => index).map((index) => {
              const text = `Option ${index + 1}`
              const value = `option_${index + 1}`
              return html`<aui-combobox-item .value=${value}>${text}</aui-combobox-item>`
            })}
            <aui-combobox-empty>No option found</aui-combobox-empty>
          </aui-combobox-list>
        </aui-combobox-root>
      </aui-popover-content>
    </aui-popover-root>
  `,
  query(".example-combobox-preview"),
)
