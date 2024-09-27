import { registerCustomElement } from "@aria-ui/core"

import { SelectContentElement } from "./elements"
import { SelectItemElement } from "./elements"
import { SelectListElement } from "./elements"
import { SelectRootElement } from "./elements"
import { SelectTriggerElement } from "./elements"
import { SelectValueElement } from "./elements"

export * from "./select-content.types"
export * from "./select-item.types"
export * from "./select-list.types"
export * from "./select-root.types"
export * from "./select-trigger.types"
export * from "./select-value.types"

registerCustomElement("aria-ui-select-content", SelectContentElement)
registerCustomElement("aria-ui-select-item", SelectItemElement)
registerCustomElement("aria-ui-select-list", SelectListElement)
registerCustomElement("aria-ui-select-root", SelectRootElement)
registerCustomElement("aria-ui-select-trigger", SelectTriggerElement)
registerCustomElement("aria-ui-select-value", SelectValueElement)
