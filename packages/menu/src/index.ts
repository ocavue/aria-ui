import { registerCustomElement } from "@aria-ui/core"

import { MenuContentElement } from "./elements"
import { MenuItemElement } from "./elements"
import { MenuRootElement } from "./elements"
import { MenuTriggerElement } from "./elements"

export * from "./menu-content.types"
export * from "./menu-item.types"
export * from "./menu-root.types"
export * from "./menu-trigger.types"

registerCustomElement("aria-ui-menu-content", MenuContentElement)
registerCustomElement("aria-ui-menu-item", MenuItemElement)
registerCustomElement("aria-ui-menu-root", MenuRootElement)
registerCustomElement("aria-ui-menu-trigger", MenuTriggerElement)
