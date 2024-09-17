import { registerCustomElement } from "@aria-ui/core"

import { ComboboxEmptyElement } from "./combobox-empty.element.gen"
import { ComboboxItemElement } from "./combobox-item.element.gen"
import { ComboboxListElement } from "./combobox-list.element.gen"
import { ComboboxRootElement } from "./combobox-root.element.gen"

export * from "./combobox-empty.types"
export * from "./combobox-item.types"
export * from "./combobox-list.types"
export * from "./combobox-root.types"
registerCustomElement("aria-ui-combobox-empty", ComboboxEmptyElement)
registerCustomElement("aria-ui-combobox-item", ComboboxItemElement)
registerCustomElement("aria-ui-combobox-list", ComboboxListElement)
registerCustomElement("aria-ui-combobox-root", ComboboxRootElement)
