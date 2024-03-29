import "./combobox-preview.css"

import { ComboboxElement } from "@aria-ui/combobox"
import { ListboxElement, ListboxItemElement } from "@aria-ui/listbox"
import { html, render } from "lit-html"

customElements.define("aui-combobox", ComboboxElement)
customElements.define("aui-listbox", ListboxElement)
customElements.define("aui-listbox-item", ListboxItemElement)

function query(selector: string): HTMLElement {
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Element not found: ${selector}`)
  }
  return element as HTMLElement
}

render(
  html`
    <aui-combobox>
      <input type="text">
      <aui-listbox>
        <aui-listbox-item .value=${"option1"}>Option 1</aui-listbox-item>
        <aui-listbox-item .value=${"option2"}>Option 2</aui-listbox-item>
        <aui-listbox-item .value=${"option3"}>Option 3</aui-listbox-item>
        <aui-listbox-item .value=${"option4"}>Option 4</aui-listbox-item>
        <aui-listbox-item .value=${"option5"}>Option 5</aui-listbox-item>
        <aui-listbox-item .value=${"option6"}>Option 6</aui-listbox-item>
        <aui-listbox-item .value=${"option7"}>Option 7</aui-listbox-item>
        <aui-listbox-item .value=${"option8"}>Option 8</aui-listbox-item>
        <aui-listbox-item .value=${"option9"}>Option 9</aui-listbox-item>
        <aui-listbox-item .value=${"option10"}>Option 10</aui-listbox-item>
        <aui-listbox-item .value=${"option11"}>Option 11</aui-listbox-item>
        <aui-listbox-item .value=${"option12"}>Option 12</aui-listbox-item>
        <aui-listbox-item .value=${"option13"}>Option 13</aui-listbox-item>
        <aui-listbox-item .value=${"option14"}>Option 14</aui-listbox-item>
        <aui-listbox-item .value=${"option15"}>Option 15</aui-listbox-item>
        <aui-listbox-item .value=${"option16"}>Option 16</aui-listbox-item>
        <aui-listbox-item .value=${"option17"}>Option 17</aui-listbox-item>
        <aui-listbox-item .value=${"option18"}>Option 18</aui-listbox-item>
        <aui-listbox-item .value=${"option19"}>Option 19</aui-listbox-item>
        <aui-listbox-item .value=${"option20"}>Option 20</aui-listbox-item>
      </aui-listbox>
    </aui-combobox>
  `,
  query(".example-combobox-preview"),
)
