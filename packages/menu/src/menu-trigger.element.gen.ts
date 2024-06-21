import { ElementBuilder } from "@aria-ui/core"

import { defaultMenuTriggerProps, type MenuTriggerProps } from "./menu-trigger.props"
import { useMenuTrigger } from "./menu-trigger.state"

/**
 * A custom MenuTrigger element.
 *
 * @group MenuTrigger
 */
export class MenuTriggerElement extends ElementBuilder<MenuTriggerProps>(
  useMenuTrigger,
  defaultMenuTriggerProps,
) {}
