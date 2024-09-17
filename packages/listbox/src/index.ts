import { registerCustomElement } from "@aria-ui/core"
import { ListboxEmptyElement } from "./listbox-empty.element.gen"
import { ListboxItemElement } from "./listbox-item.element.gen"
import { ListboxElement } from "./listbox.element.gen"
export * from "./listbox-empty.types"
export * from "./listbox-item.types"
export * from "./listbox.types"
registerCustomElement("aria-ui-listbox-empty", ListboxEmptyElement)
registerCustomElement("aria-ui-listbox-item", ListboxItemElement)
registerCustomElement("aria-ui-listbox", ListboxElement)
