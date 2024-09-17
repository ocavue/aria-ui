import { defineCustomElement } from "@aria-ui/core"

import { useMenuTrigger } from "./menu-trigger.setup"
import { menuTriggerEvents, menuTriggerProps, type MenuTriggerEvents, type MenuTriggerProps } from "./menu-trigger.types"

/**
 * A custom MenuTrigger element.
 *
 * @group MenuTrigger
 */
export class MenuTriggerElement extends defineCustomElement<
  MenuTriggerProps,
  MenuTriggerEvents
>({
  props: menuTriggerProps,
  events: menuTriggerEvents,
  setup: useMenuTrigger,
}) {}
