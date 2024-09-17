import { registerCustomElement } from "@aria-ui/core"

import { OverlayAnchorElement } from "./overlay-anchor.element.gen"
import { OverlayPositionerElement } from "./overlay-positioner.element.gen"
import { OverlayRootElement } from "./overlay-root.element.gen"

export * from "./overlay-anchor.types"
export * from "./overlay-positioner.types"
export * from "./overlay-root.types"
registerCustomElement("aria-ui-overlay-anchor", OverlayAnchorElement)
registerCustomElement("aria-ui-overlay-positioner", OverlayPositionerElement)
registerCustomElement("aria-ui-overlay-root", OverlayRootElement)
