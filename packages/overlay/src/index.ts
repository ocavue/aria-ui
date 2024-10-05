import { registerCustomElement } from "@aria-ui/core"

import { OverlayAnchorElement } from "./elements"
import { OverlayPositionerElement } from "./elements"
import { OverlayRootElement } from "./elements"

export * from "./overlay-anchor.types"
export * from "./overlay-positioner.types"
export * from "./overlay-root.types"

registerCustomElement("aria-ui-overlay-anchor", OverlayAnchorElement)
registerCustomElement("aria-ui-overlay-positioner", OverlayPositionerElement)
registerCustomElement("aria-ui-overlay-root", OverlayRootElement)
