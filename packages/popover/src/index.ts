import { registerCustomElement } from "@aria-ui/core"

import { PopoverContentElement } from "./popover-content.element.gen"
import { PopoverRootElement } from "./popover-root.element.gen"
import { PopoverTriggerElement } from "./popover-trigger.element.gen"

export * from "./popover-content.types"
export * from "./popover-root.types"
export * from "./popover-trigger.types"

registerCustomElement("aria-ui-popover-content", PopoverContentElement)
registerCustomElement("aria-ui-popover-root", PopoverRootElement)
registerCustomElement("aria-ui-popover-trigger", PopoverTriggerElement)
