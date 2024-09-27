import { registerCustomElement } from "@aria-ui/core"

import { SelectContentElement } from "./select-content.element.gen"
import { SelectItemElement } from "./select-item.element.gen"
import { SelectListElement } from "./select-list.element.gen"
import { SelectRootElement } from "./select-root.element.gen"
import { SelectTriggerElement } from "./select-trigger.element.gen"
import { SelectValueElement } from "./select-value.element.gen"

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
