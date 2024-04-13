import {
  MenuRootElement,
  MenuContentElement,
  MenuTriggerElement,
  MenuItemElement,
} from "@aria-ui/menu"
import { html, render } from "lit-html"

customElements.define("aui-menu-root", MenuRootElement)
customElements.define("aui-menu-content", MenuContentElement)
customElements.define("aui-menu-trigger", MenuTriggerElement)
customElements.define("aui-menu-item", MenuItemElement)

function query(selector: string): HTMLElement {
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Element not found: ${selector}`)
  }
  return element as HTMLElement
}

render(
  html`
    <aui-menu-root>
      <aui-menu-trigger>
        <button>Click me</button>
      </aui-menu-trigger>
      <aui-menu-content>
        <aui-menu-item .onSelect=${() => alert("Item 1 selected")}>Item 1</aui-menu-item>
        <aui-menu-item .onSelect=${() => alert("Item 2 selected")}>Item 2</aui-menu-item>
        <aui-menu-item .onSelect=${() => console.log("Item 3 selected")}>Item 3</aui-menu-item>
      </aui-menu-content>
    </aui-menu-root>
  `,
  query(".example-menu-preview"),
)
