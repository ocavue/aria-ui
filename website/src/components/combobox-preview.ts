import "./combobox-preview.css"

import {
  ComboboxElement,
  ComboboxItemElement,
  ComboboxListElement,
} from "@aria-ui/combobox"
import { html, render } from "lit-html"

customElements.define("aui-combobox", ComboboxElement)
customElements.define("aui-combobox-list", ComboboxListElement)
customElements.define("aui-combobox-item", ComboboxItemElement)

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
      <aui-combobox-list>
        <aui-combobox-item .value=${"option1"}>Option 1</aui-combobox-item>
        <aui-combobox-item .value=${"option2"}>Option 2</aui-combobox-item>
        <aui-combobox-item .value=${"option3"}>Option 3</aui-combobox-item>
        <aui-combobox-item .value=${"option4"}>Option 4</aui-combobox-item>
        <aui-combobox-item .value=${"option5"}>Option 5</aui-combobox-item>
        <aui-combobox-item .value=${"option6"}>Option 6</aui-combobox-item>
        <aui-combobox-item .value=${"option7"}>Option 7</aui-combobox-item>
        <aui-combobox-item .value=${"option8"}>Option 8</aui-combobox-item>
        <aui-combobox-item .value=${"option9"}>Option 9</aui-combobox-item>
        <aui-combobox-item .value=${"option10"}>Option 10</aui-combobox-item>
        <aui-combobox-item .value=${"option11"}>Option 11</aui-combobox-item>
        <aui-combobox-item .value=${"option12"}>Option 12</aui-combobox-item>
        <aui-combobox-item .value=${"option13"}>Option 13</aui-combobox-item>
        <aui-combobox-item .value=${"option14"}>Option 14</aui-combobox-item>
        <aui-combobox-item .value=${"option15"}>Option 15</aui-combobox-item>
        <aui-combobox-item .value=${"option16"}>Option 16</aui-combobox-item>
        <aui-combobox-item .value=${"option17"}>Option 17</aui-combobox-item>
        <aui-combobox-item .value=${"option18"}>Option 18</aui-combobox-item>
        <aui-combobox-item .value=${"option19"}>Option 19</aui-combobox-item>
        <aui-combobox-item .value=${"option20"}>Option 20</aui-combobox-item>
      </aui-combobox-list>
    </aui-combobox>
  `,
  query(".example-combobox-preview"),
)
