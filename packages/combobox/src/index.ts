import { registerCustomElement } from "@aria-ui/core"

import {
  ComboboxEmptyElement,
  ComboboxItemElement,
  ComboboxListElement,
  ComboboxRootElement,
} from "./elements"

export * from "./combobox-empty.types"
export * from "./combobox-item.types"
export * from "./combobox-list.types"
export * from "./combobox-root.types"

registerCustomElement("aria-ui-combobox-empty", ComboboxEmptyElement)
registerCustomElement("aria-ui-combobox-item", ComboboxItemElement)
registerCustomElement("aria-ui-combobox-list", ComboboxListElement)
registerCustomElement("aria-ui-combobox-root", ComboboxRootElement)
