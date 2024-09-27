import { registerCustomElement } from "@aria-ui/core"

import { ListboxEmptyElement } from "./elements"
import { ListboxItemElement } from "./elements"
import { ListboxElement } from "./elements"

export * from "./listbox-empty.types"
export * from "./listbox-item.types"
export * from "./listbox.types"

registerCustomElement("aria-ui-listbox-empty", ListboxEmptyElement)
registerCustomElement("aria-ui-listbox-item", ListboxItemElement)
registerCustomElement("aria-ui-listbox", ListboxElement)
