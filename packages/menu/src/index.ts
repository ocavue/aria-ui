import { registerCustomElement } from "@aria-ui/core"

import { MenuContentElement } from "./menu-content.element.gen"
import { MenuItemElement } from "./menu-item.element.gen"
import { MenuRootElement } from "./menu-root.element.gen"
import { MenuTriggerElement } from "./menu-trigger.element.gen"

export * from "./menu-content.types"
export * from "./menu-item.types"
export * from "./menu-root.types"
export * from "./menu-trigger.types"
registerCustomElement("aria-ui-menu-content", MenuContentElement)
registerCustomElement("aria-ui-menu-item", MenuItemElement)
registerCustomElement("aria-ui-menu-root", MenuRootElement)
registerCustomElement("aria-ui-menu-trigger", MenuTriggerElement)
