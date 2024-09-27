import { registerCustomElement } from "@aria-ui/core"

import { TooltipContentElement } from "./elements"
import { TooltipRootElement } from "./elements"
import { TooltipTriggerElement } from "./elements"

export * from "./tooltip-content.types"
export * from "./tooltip-root.types"
export * from "./tooltip-trigger.types"

registerCustomElement("aria-ui-tooltip-content", TooltipContentElement)
registerCustomElement("aria-ui-tooltip-root", TooltipRootElement)
registerCustomElement("aria-ui-tooltip-trigger", TooltipTriggerElement)
