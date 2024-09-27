import { registerCustomElement } from "@aria-ui/core"

import { PopoverContentElement } from "./elements"
import { PopoverRootElement } from "./elements"
import { PopoverTriggerElement } from "./elements"

export * from "./popover-content.types"
export * from "./popover-root.types"
export * from "./popover-trigger.types"

registerCustomElement("aria-ui-popover-content", PopoverContentElement)
registerCustomElement("aria-ui-popover-root", PopoverRootElement)
registerCustomElement("aria-ui-popover-trigger", PopoverTriggerElement)
